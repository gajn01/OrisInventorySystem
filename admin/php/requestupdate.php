<?php
include("connection.php"); 

    $request_id= $_POST['request_id'];
    $product_code= $_POST['product_code'];
    $product_category= $_POST['product_category'];
    $product_quantity= $_POST['product_quantity'];

    $status= $_POST['status'];
    $approved_by= $_POST['approved_by'];
    $noted_by= $_POST['note_by'];
    $date_approved= $_POST['date_approved'];
    $date_to_claim= $_POST['date_to_claim'];
    $remarks= $_POST['remarks'];

    $form_data = array();
    $update_query = "UPDATE tbl_history SET 
        date_approved = '$date_approved', 
        date_to_claim = '$date_to_claim', 
        status = '$status',
        approved_by = '$approved_by', 
        noted_by = '$noted_by',
        remarks = '$remarks',
        product_quantity = '$product_quantity'
        WHERE id = '$request_id' ";
        $update_inventory_query = "";
    if ($status == '2') {
        /* Check quantity */
        $sql=("SELECT * FROM tbl_inventory WHERE product_code = '$product_code' AND product_quantity >= '$product_quantity' ");
        $result= mysqli_query($db,$sql);
    
        if ($result->num_rows > 0) {
        $update_inventory_query = "UPDATE tbl_inventory SET product_quantity = product_quantity - '$product_quantity' WHERE product_code = '$product_code' ";
        } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Invalid quantity!";
        echo json_encode($form_data);
        exit();
        }
    } else {
        $update_inventory_query = "UPDATE tbl_inventory SET product_quantity = product_quantity + '$product_quantity' WHERE product_code = '$product_code' ";
    }
    
    if (mysqli_query($db, $update_query) && mysqli_query($db, $update_inventory_query)) {
        $form_data['success'] = true;
        $form_data['success_msg'] = "Record updated successfully!";
    
        $ip = file_get_contents('http://icanhazip.com/');
        $template = 'Update status of request ID: ',$request_id;
        $sql_activity = "INSERT INTO tbl_activity_log (user , activity, ip_address) VALUES ('Admin', '$template', '$ip')";
        mysqli_query($db, $sql_activity);
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] ="Failed to update record!";
    }
    
    echo json_encode($form_data);
    $db->close();
    $db->close();

?>