<?php
include("connection.php"); //Establishing connection with our database
 
    $product_code = $_POST['product_code']; 
    $product_category = $_POST['product_category']; 
    $product_name= $_POST['product_name'];
    $product_quantity= $_POST['product_quantity'];
    $purpose= $_POST['purpose'];
    $full_name = $_POST['full_name'];
    $department= $_POST['department'];
    $position= $_POST['position'];
    $date_requested= $_POST['date_requested'];
    $date_to_claim= $_POST['date_to_claim'];
    if($product_category == "Supplies"){
        $product_category= 1;
        $date_return = null;
    }else{
        $date_return= $_POST['date_return'];
        $product_category= 2;
    }
// To protect from MySQL injection
    $product_code = stripslashes($product_code);
    $product_category = stripslashes($product_category);
    $product_name = stripslashes($product_name);
    $product_quantity = stripslashes($product_quantity);
    $purpose = stripslashes($purpose);
    $full_name = stripslashes($full_name);
    $department = stripslashes($department);
    $position = stripslashes($position);
    $date_requested = stripslashes($date_requested);
    $date_to_claim = stripslashes($date_to_claim);
    $date_return = stripslashes($date_return);

    $product_code = mysqli_real_escape_string($db,$product_code);
    $product_category = mysqli_real_escape_string($db,$product_category);
    $product_name = mysqli_real_escape_string($db,$product_name);
    $product_quantity = mysqli_real_escape_string($db,$product_quantity);
    $purpose = mysqli_real_escape_string($db,$purpose);
    $full_name = mysqli_real_escape_string($db,$full_name);
    $department = mysqli_real_escape_string($db,$department);
    $position = mysqli_real_escape_string($db,$position);
    $date_requested = mysqli_real_escape_string($db,$date_requested);
    $date_to_claim = mysqli_real_escape_string($db,$date_to_claim);

    $sql=("INSERT INTO tbl_history (product_category,product_name,product_code,product_quantity,purpose,full_name,department,position,date_requested,date_return,date_to_claim,status) 
    VALUES ('$product_category','$product_name','$product_code','$product_quantity','$purpose','$full_name','$department','$position','$date_requested','$date_return','$date_to_claim','1')");
        if (mysqli_query($db, $sql)) {
        $form_data['success'] = true;
        if($product_category == 1){
            $form_data['success_msg'] = "Request successful";
        }else{
            $form_data['success_msg'] = "Borrow successful";
        }

    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Action failed";
    }
echo json_encode($form_data);
$db->close();
?>