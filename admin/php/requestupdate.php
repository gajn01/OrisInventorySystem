<?php
include("connection.php"); 

    $request_id= $_POST['request_id'];
    $status= $_POST['status'];
    $approved_by= $_POST['approved_by'];
    $date_approved= $_POST['date_approved'];
    $noted_by= $_POST['note_by'];

    $update_query = ("UPDATE tbl_history SET 
    approved_by = '$approved_by', 
    noted_by = '$noted_by', 
    date_approved = '$date_approved', 
    status = '$status' 
    WHERE id = '$request_id'");
    if (mysqli_query($db, $update_query)) {
        $form_data['success'] = true;
        $form_data['success_msg'] = "Record updated successfully!";
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] ="Failed to update record!";
    }
    echo json_encode($form_data);
    $db->close();
?>