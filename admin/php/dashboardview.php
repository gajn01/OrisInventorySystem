<?php
    include("connection.php"); 

    $form_data = array();
    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_inventory");
    $result = mysqli_query($db, $sql);
    $rows = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
        $rows[] = $row;
    }
    if (!empty($rows)) {
        $form_data['success'] = true;
        $form_data['material'] = $rows;
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
   

    /* get total Account  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_account");
    $result = mysqli_query($db, $sql);
    $rows = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
        $rows[] = $row;
    }
    if (!empty($rows)) {
        $form_data['success'] = true;
        $form_data['account'] = $rows;
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
   

     /* get total Account  */
     $sql=("SELECT COUNT(id) AS ctr FROM tbl_history WHERE status != '2'");
     $result = mysqli_query($db, $sql);
     $rows = array();
     while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
         $rows[] = $row;
     }
     if (!empty($rows)) {
         $form_data['success'] = true;
         $form_data['requisition'] = $rows;
     } else {
         $form_data['success'] = false;
         $form_data['error_msg'] = "No record found!";
     }
    
     /* Fixed asset */
     $sql=("SELECT product_name as label , COUNT(id) as y FROM `tbl_history` WHERE product_category = '1' GROUP BY product_name LIMIT 5");
     $result = mysqli_query($db, $sql);
     $rows = array();
     while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
         $rows[] = $row;
     }
     if (!empty($rows)) {
         $form_data['success'] = true;
         $form_data['material_graph'] = $rows;
     } else {
         $form_data['success'] = false;
         $form_data['error_msg'] = "No record found!";
     }

     /* Supplies */
     $sql=("SELECT product_name as label , COUNT(id) as y FROM `tbl_history` WHERE product_category = '2' GROUP BY product_name LIMIT 5");
     $result = mysqli_query($db, $sql);
     $rows = array();
     while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
         $rows[] = $row;
     }
     if (!empty($rows)) {
         $form_data['success'] = true;
         $form_data['supplies'] = $rows;
     } else {
         $form_data['success'] = false;
         $form_data['error_msg'] = "No record found!";
     }


    echo json_encode($form_data);
    $db->close();

   
?>