<?php
include("connection.php"); 

    $account_id= $_POST['account_id'];
    $firstname= $_POST['firstname'];
    $lastname= $_POST['lastname'];
    $email= $_POST['email'];
    $employment_status= $_POST['employment_status'];
    $position= $_POST['position'];
    $department= $_POST['department'];
    if(isset($_POST['is_incharge']) ){
        $is_incharge = 1;
    }else{
        $is_incharge = 0;
    }

    $update_query = ("UPDATE tbl_account_profile SET 
        firstname='$firstname', 
        lastname='$lastname',  
        email='$email',  
        employement_status='$employment_status',  
        position='$position',  
        department='$department',  
        is_incharge='$is_incharge' 
        WHERE account_id='$account_id'");

    if (mysqli_query($db, $update_query)) {
        $form_data['success'] = true;
        $form_data['success_msg'] = "Record updated successfully!";
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] ="Failed to update password!";
    }
    echo json_encode($form_data);
    $db->close();
?>