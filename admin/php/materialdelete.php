<?php
include("connection.php"); 

    $form_data = array();
    $product_code=$_POST['product_code'];
    $sql=("DELETE FROM  tbl_inventory WHERE product_code='$product_code' ");
    if (mysqli_query($db, $sql)) {
        $form_data['success'] = true;
        $form_data['success_msg'] = "Record successfully delete";
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Record failed to delete";
    }
    echo json_encode($form_data);
    $db->close();
?>