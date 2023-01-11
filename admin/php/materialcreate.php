<?php
include("connection.php"); //Establishing connection with our database
 
    $product_name= $_POST['product_name'];
    $product_description= $_POST['product_description'];
    $quantity= $_POST['quantity'];
    $location= $_POST['location'];
    $item_code= $_POST['item_code'];
    $unit= $_POST['unit'];
    $person_charge= $_POST['person_charge'];
    $inventory_date= $_POST['inventory_date'];
    $receiving_date= $_POST['receiving_date'];
    $product_remarks= $_POST['product_remarks'];




// To protect from MySQL injection
    $firstname = stripslashes($firstname);
    $lastname = stripslashes($lastname);
    $email = stripslashes($email);
    $employment_status = stripslashes($employment_status);
    $position = stripslashes($position);
    $department = stripslashes($department);

    $firstname = mysqli_real_escape_string($db, $firstname);
    $lastname = mysqli_real_escape_string($db, $lastname);
    $email = mysqli_real_escape_string($db, $email);
    $employment_status = mysqli_real_escape_string($db, $employment_status);
    $position = mysqli_real_escape_string($db, $position);
    $department = mysqli_real_escape_string($db, $department);
  
    /* if username is avaiable insert into tbl_account */
    $sql_insert_account=("INSERT INTO tbl_account (email,password) VALUES ('$email','$password_hash')");
    if (mysqli_query($db, $sql_insert_account)) {
        $last_id = $db->insert_id;
    /* after insert into tbl_account insert into tbl_account_profile */
        $sql_insert_profile=("INSERT INTO tbl_account_profile (account_id,email,firstname,lastname,department,position,employement_status) 
        VALUES ('$last_id','$email','$firstname','$lastname','$department','$position','$employment_status')");
            if (mysqli_query($db, $sql_insert_profile)) {
            $form_data['success'] = true;
            $form_data['data'] = $password;
            $form_data['success_msg'] = "Successfully registered";
        } else {
            $form_data['success'] = false;
            $form_data['error_msg'] = "Failed to register profile";
        }
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "Failed to register account";
    }
echo json_encode($form_data);
$db->close();
?>