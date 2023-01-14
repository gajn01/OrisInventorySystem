<?php
session_start();
include("connection.php"); 

        $email=$_POST['email'];
        $password=$_POST['password'];

        $email = stripslashes($email);
        $password = stripslashes($password);
        $email = mysqli_real_escape_string($db, $email);
        $password = mysqli_real_escape_string($db, $password);
        $password = md5($password);
        
        $sql=("SELECT 
        tbl_account_profile.email,
        tbl_account_profile.account_id,
        tbl_account_profile.department
        FROM tbl_account_profile RIGHT JOIN tbl_account ON 
        tbl_account.id = tbl_account_profile.account_id WHERE tbl_account.email = '$email' AND tbl_account.password = '$password'");
        $result= mysqli_query($db,$sql);
        $form_data = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $form_data['success'] = true;
                $form_data['data'] = $row;
                $form_data['success_msg'] = "You have successfully login!";
            }
        }else {
            $form_data['success'] = false;
            $form_data['error_msg'] = "Invalid Credentials!";

        }
        echo json_encode($form_data);
        $db->close();
?>