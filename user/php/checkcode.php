<?php
    include("connection.php"); 
    $email = $_POST['email'];
    $code = $_POST['code'];
    $temp_password = rand(100000,500000);
    $new_password = md5($temp_password);
    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT * FROM tbl_forgotpassword_request WHERE email = '$email' AND code = '$code' ");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $sql=("SELECT * FROM tbl_account_profile WHERE email = '$email'");
        $result= mysqli_query($db,$sql);
        $form_data = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = $row["account_id"];
                $sql=("UPDATE tbl_account SET password='$new_password' WHERE id='$id'");
                $form_data = array();
                if (mysqli_query($db, $sql)) {
                    $form_data['success'] = true;
                    $form_data['temp_password'] = $temp_password;
                } else {
                    $form_data['success'] = false;
                    $form_data['error_msg'] = $sql;
                }
            }
        }else{
            $form_data['success'] = false;
            $form_data['error_msg'] = "No record found!";
        }
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
    echo json_encode($form_data);
?>