<?php
include("connection.php"); 

    $account_id= $_POST['account_id'];
    $email= $_POST['email'];
    $department= $_POST['department'];
    if(isset($_POST['is_incharge']) ){
        $is_incharge = 1;
    }else{
        $is_incharge = 0;
    }
    $update_query = ("UPDATE tbl_account_profile SET 
        email='$email',  
        department='$department'        
        WHERE account_id='$account_id'");
    if (mysqli_query($db, $update_query)) {
        $form_data['success'] = true;
        $form_data['success_msg'] = "Record updated successfully!";

        $ip = file_get_contents('http://icanhazip.com/');
        $template = 'Made changes to '+$email;
        $sql_activity = "INSERT INTO tbl_activity_log (user , activity, ip_address) VALUES ('Admin', '$template', '$ip')";



        mysqli_query($db, $sql_activity);
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] ="Failed to update password!";
    }
    echo json_encode($form_data);
    $db->close();
?>