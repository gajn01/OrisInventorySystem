<?php
include("connection.php"); 

    $request_id= $_POST['request_id'];
    $status= $_POST['status'];
    $approved_by= $_POST['approved_by'];
    $date_approved= $_POST['date_approved'];
    $noted_by= $_POST['note_by'];

    $product_quantity= $_POST['product_quantity'];
    $product_code= $_POST['product_code'];
    $remarks= $_POST['remarks'];

    $sql=("SELECT * FROM `tbl_inventory` WHERE product_code = '$product_code' AND product_quantity >= '$product_quantity' ");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $update_query = ("UPDATE tbl_history SET 
        approved_by = '$approved_by', 
        noted_by = '$noted_by', 
        date_approved = '$date_approved', 
        remarks = '$remarks', 
        product_quantity = '$product_quantity', 
        status = '$status' 
        WHERE id = '$request_id'");
        if (mysqli_query($db, $update_query)) {
            if($status == 2){
                $update_query = ("UPDATE tbl_inventory SET 
                product_quantity =  product_quantity - '$product_quantity'
                WHERE product_code = '$product_code' ");
                if (mysqli_query($db, $update_query)) {
                    $form_data['success'] = true;
                    $form_data['success_msg'] = "Record updated successfully!";
                } else {
                    $form_data['success'] = false;
                    $form_data['error_msg'] ="Failed to update record!";
                } 
            }else{
                $form_data['success'] = true;
                $form_data['success_msg'] = "Record updated successfully!";
            }
            $form_data['success'] = true;
            $form_data['success_msg'] = "Record updated successfully!";
        } else {
            $form_data['success'] = false;
            $form_data['error_msg'] ="Failed to update record!";
        } 
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "Invalid quantity!";
    }
    echo json_encode($form_data);
    $db->close();
?>