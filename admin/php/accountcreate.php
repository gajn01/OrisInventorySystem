<?php
include("connection.php"); //Establishing connection with our database
    function getRandomStringUniqid()
    {
        $string = uniqid(rand());
        $randomString = substr($string, 0, 6);
        return $randomString;
    }
    $firstname= $_POST['firstname'];
    $lastname= $_POST['lastname'];
    $email= $_POST['email'];
    $employment_status= $_POST['employment_status'];
    $position= $_POST['position'];
    $department= $_POST['department'];
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
    $password = getRandomStringUniqid();
    $password_hash = md5($password);

    /* Check if email is available */
    $sql=("SELECT * FROM tbl_account WHERE email='$email' ");
    $result= mysqli_query($db,$sql);
    $form_data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $form_data['success'] = false;
            $form_data['error_msg'] = "Email address is not available!";
        }
    }else {
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
    }
echo json_encode($form_data);
$db->close();
?>