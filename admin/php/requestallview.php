<?php
    include("connection.php"); 
  
    $form_data = array();
    $sql = "SELECT * FROM tbl_history";
    $result = mysqli_query($db, $sql);
    $rows = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
        $rows[] = $row;
    }
    if (!empty($rows)) {
        $form_data['success'] = true;
        $form_data['data'] = $rows;
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
    
    echo json_encode($form_data);
    
    $db->close();

?>