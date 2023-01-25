<?php
include("connection.php"); 
    $account_id=$_POST['account_id'];
    $old_password=$_POST['old_password'];
    $new_password=$_POST['new_password'];
    $confirm_password=$_POST['confirm_password'];

    $new_password = md5($new_password);
    $old_password = md5($old_password);

    $form_data = array();
    $select_query = ("SELECT * FROM tbl_account WHERE id='$account_id' AND password='$old_password'");
    $result= mysqli_query($db,$select_query);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $update_query = ("UPDATE tbl_account SET password='$new_password' WHERE id='$account_id'");
            if (mysqli_query($db, $update_query)) {
                $form_data['success'] = true;
                $form_data['success_msg'] = "Password updated successfully!";
            } else {
                $form_data['success'] = false;
                $form_data['error_msg'] ="Failed to update password!";
            }
        }
    }else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Invalid password!";
    }
    echo json_encode($form_data);
    $db->close();
?>