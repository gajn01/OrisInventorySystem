<?php
    include("connection.php"); 
    $email = $_POST['email_address'];
    $code = rand(10000,50000);
    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT * FROM tbl_account_profile WHERE email = '$email'");
    $result= mysqli_query($db,$sql);
    $form_data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $id = $row["account_id"];
            $form_data['success'] = true;
            $sql=("INSERT INTO tbl_forgotpassword_request (email,account_id,code) VALUES ('$email','$id','$code')");
            $form_data = array();
            if (mysqli_query($db, $sql)) {
                $form_data['success'] = true;
                $form_data['code'] = $code;
                $form_data['success_msg'] = "We have sent a code to your email";
            } else {
                $form_data['success'] = false;
                $form_data['error_msg'] = $sql;
            }
        }
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
    echo json_encode($form_data);
?>