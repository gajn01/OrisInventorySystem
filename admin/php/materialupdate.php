<?php
include("connection.php"); 

    $product_category= $_POST['product_category'];
    $product_name= $_POST['product_name'];
    $product_description= $_POST['product_description'];
    $product_quantity= $_POST['product_quantity'];
    $product_location= $_POST['product_location'];
    $product_code = $_POST['product_code'];
    $product_unit= $_POST['product_unit'];
    $product_person_incharge= $_POST['product_person_incharge'];
    $product_inventory_date= $_POST['product_inventory_date'];
    $product_recieved_date= $_POST['product_recieved_date'];
    $product_remarks= $_POST['product_remarks'];
    if($product_category == 1){
        $product_status = 0;
    }else{
        $product_status = $_POST['product_status'];
    }

    $update_query = ("UPDATE tbl_inventory SET 
    product_category = '$product_category', 
    product_name = '$product_name', 
    product_description = '$product_description', 
    product_quantity = '$product_quantity', 
    product_location = '$product_location', 
    product_unit = '$product_unit', 
    product_person_incharge = '$product_person_incharge', 
    product_inventory_date = '$product_inventory_date', 
    product_recieved_date = '$product_recieved_date', 
    product_remarks = '$product_remarks', 
    product_status = '$product_status' 
    WHERE product_code = '$product_code'");

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