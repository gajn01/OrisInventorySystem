<?php
include("connection.php"); //Establishing connection with our database
 
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

// To protect from MySQL injection
    $product_category = stripslashes($product_category);
    $product_name = stripslashes($product_name);
    $product_description = stripslashes($product_description);
    $product_quantity = stripslashes($product_quantity);
    $product_location = stripslashes($product_location);
    $product_code = stripslashes($product_code);
    $product_unit = stripslashes($product_unit);
    $product_person_incharge = stripslashes($product_person_incharge);
    $product_inventory_date = stripslashes($product_inventory_date);
    $product_recieved_date = stripslashes($product_recieved_date);
    $product_remarks = stripslashes($product_remarks);
    $product_status = stripslashes($product_status);

    $product_category = mysqli_real_escape_string($db,$product_category);
    $product_name = mysqli_real_escape_string($db,$product_name);
    $product_description = mysqli_real_escape_string($db,$product_description);
    $product_quantity = mysqli_real_escape_string($db,$product_quantity);
    $product_location = mysqli_real_escape_string($db,$product_location);
    $product_code = mysqli_real_escape_string($db,$product_code);
    $product_unit = mysqli_real_escape_string($db,$product_unit);
    $product_person_incharge = mysqli_real_escape_string($db,$product_person_incharge);
    $product_inventory_date = mysqli_real_escape_string($db,$product_inventory_date);
    $product_recieved_date = mysqli_real_escape_string($db,$product_recieved_date);
    $product_remarks = mysqli_real_escape_string($db,$product_remarks);
    $product_status = mysqli_real_escape_string($db,$product_status);

    $sql=("INSERT INTO tbl_inventory (product_code,product_category,product_name,product_description,product_quantity,product_unit,product_location,product_person_incharge,product_status,product_recieved_date,product_inventory_date,product_remarks) 
    VALUES ('$product_code','$product_category','$product_name','$product_description','$product_quantity','$product_unit','$product_location','$product_person_incharge','$product_status','$product_recieved_date','$product_inventory_date','$product_remarks')");
        if (mysqli_query($db, $sql)) {
        $form_data['success'] = true;
        $form_data['success_msg'] = "Successfully added product";

        $ip = file_get_contents('http://icanhazip.com/');
        $sql_activity = "INSERT INTO tbl_activity_log (user , activity, ip_address) VALUES ('Admin', 'Add a material in inventory', '$ip')";
        mysqli_query($db, $sql_activity);
        
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Failed to add product";
    }
echo json_encode($form_data);
$db->close();
?>