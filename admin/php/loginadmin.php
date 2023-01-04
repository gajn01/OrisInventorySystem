<?php
include("connection.php"); //Establishing connection with our database
// Define $email and $password
    $username= $_POST['username'];
    $password= $_POST['password'];
// To protect from MySQL injection
    $username = stripslashes($username);
    $password = stripslashes($password);
    $username = mysqli_real_escape_string($db, $username);
    $password = mysqli_real_escape_string($db, $password);
    $password = md5($password);
    
    $sql=("SELECT * FROM tbl_account_admin WHERE username='$username' and password='$password'");
    $result= mysqli_query($db,$sql);
    $form_data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $form_data['success'] = true;
            $form_data['data'] = array(
                    'id' => $row["id"],
                    'username' => $row['username']
                );
            $form_data['success_msg'] = "You have successfully login!";
        }
    }else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "Invalid Credentials!";
    }
    echo json_encode($form_data);
    $db->close();
?>