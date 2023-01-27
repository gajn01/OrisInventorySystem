<?php
    include("connection.php"); 
  
    $form_data = array();

    $sql = "SELECT * FROM tbl_history ";
    /* Fetch module based on subject and teacher ID */
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['data'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
    echo json_encode($form_data);
?>