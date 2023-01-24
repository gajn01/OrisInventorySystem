<?php
    include("connection.php"); 


    
    $date_filtered = $_POST['date_filtered'];
    $filter_type = $_POST['filter_type'];
    $date_end = $_POST['date_end'];


    if($filter_type == 1){
        $sql=("SELECT date_requested as label , COUNT(id) as y FROM `tbl_history` WHERE date_requested = '$date_filtered' GROUP BY date_requested");
    }else if($filter_type == 2){
        $sql=("SELECT date_requested as label , COUNT(id) as y FROM `tbl_history`  WHERE date(date_requested) BETWEEN '$date_filtered[0]' AND '$date_filtered[6]' GROUP BY date_requested");
    }else if($filter_type == 3){
        $sql=("SELECT DATE_FORMAT(date_requested,'%Y') as year,MONTHNAME(date_requested) as month,COUNT(*) as total FROM tbl_history GROUP BY year, month");
    }else if($filter_type == 4){
        $sql=("SELECT date_requested as label , COUNT(id) as y FROM `tbl_history`  WHERE date(date_requested) BETWEEN '$date_filtered' AND '$date_end' GROUP BY date_requested");

    }
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['date'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }

    echo json_encode($form_data);
?>