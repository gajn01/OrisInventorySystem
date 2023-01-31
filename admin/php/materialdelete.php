<?php
include("connection.php"); 

    $form_data = array();
    $product_code=$_POST['product_code'];
    $sql=("DELETE FROM  tbl_inventory WHERE product_code='$product_code' ");
    if (mysqli_query($db, $sql)) {
        $form_data['success'] = true;
        $form_data['success_msg'] = "Record successfully delete";

        $ip = file_get_contents('http://icanhazip.com/');
        $template = 'Deleted '+$product_code;
        $sql_activity = "INSERT INTO tbl_activity_log (user , activity, ip_address) VALUES ('Admin', '$template', '$ip')";
        mysqli_query($db, $sql_activity);
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Record failed to delete";
    }
    echo json_encode($form_data);
    $db->close();
?>