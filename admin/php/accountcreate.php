<?php
include("connection.php"); //Establishing connection with our database
    function getRandomStringUniqid()
    {
        $string = uniqid(rand());
        $randomString = substr($string, 0, 6);
        return $randomString;
    }
    $email= $_POST['email'];
    $department= $_POST['department'];
// To protect from MySQL injection

    $email = stripslashes($email);
    $department = stripslashes($department);
    $email = mysqli_real_escape_string($db, $email);
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
            $sql_insert_profile=("INSERT INTO tbl_account_profile (account_id,email,department) 
            VALUES ('$last_id','$email','$department')");
                if (mysqli_query($db, $sql_insert_profile)) {
                $form_data['success'] = true;
                $form_data['data'] = $password;
                $form_data['success_msg'] = "Successfully registered";

                $ip = file_get_contents('http://icanhazip.com/');
                $sql_activity = "INSERT INTO tbl_activity_log (user , activity, ip_address) VALUES ('Admin', 'Created an account', '$ip')";
                mysqli_query($db, $sql_activity);
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