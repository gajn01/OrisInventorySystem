<?php
include("connection.php"); 
    $form_data = array();
    $account_id=$_POST['account_id'];
    $sql=("DELETE FROM  tbl_account_profile WHERE account_id='$account_id' ");
    if (mysqli_query($db, $sql)) {
        $sql_delete_account=("DELETE FROM  tbl_account WHERE id='$account_id' ");
        if (mysqli_query($db, $sql_delete_account)) {
            $form_data['success'] = true;
            $form_data['success_msg'] = "Record successfully delete";

            $ip = file_get_contents('http://icanhazip.com/');
            $template = 'Deleted account id: '. $account_id;
            $sql_activity = "INSERT INTO tbl_activity_log (user , activity, ip_address) VALUES ('Admin', '$template', '$ip')";
            mysqli_query($db, $sql_activity);
        } else {
            $form_data['success'] = false;
            $form_data['error_msg'] = "Record failed to delete";
        }
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Record failed to delete";
    }
    echo json_encode($form_data);
    $db->close();
?>