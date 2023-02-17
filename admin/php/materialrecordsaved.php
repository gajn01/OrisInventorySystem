<?php
include("connection.php"); //Establishing connection with our database
 
    $selectInventory=("SELECT * FROM tbl_inventory");
    $result= mysqli_query($db,$selectInventory);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $sql = "INSERT INTO tbl_final_inventory (id,product_code, product_category, product_name, product_description, product_quantity, product_unit, product_location, product_person_incharge, product_status, product_recieved_date, product_inventory_date, product_remarks) 
            VALUES ('$row[id]','$row[product_code]', '$row[product_category]', '$row[product_name]', '$row[product_description]', '$row[product_quantity]', '$row[product_unit]', '$row[product_location]', '$row[product_person_incharge]', '$row[product_status]', '$row[product_recieved_date]', '$row[product_inventory_date]', '$row[product_remarks]')";
            mysqli_query($db, $sql);
        }
        $form_data['success'] = true;
        $form_data['success_msg'] = "Successfully Saved Initial Inventory!";

        $ip = file_get_contents('http://icanhazip.com/');
        $template ='Saved initial inventory ';
        $sql_activity = "INSERT INTO tbl_activity_log (user , activity, ip_address) VALUES ('Admin', '$template', '$ip')";
        mysqli_query($db, $sql_activity);

    }else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Invalid Credentials!";
    }


echo json_encode($form_data);
$db->close();
?>