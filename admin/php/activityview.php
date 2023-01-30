<?php
    include("connection.php"); 
    $limit = $_POST['limit'];
    $page = $_POST['page'];
   /*  $search = $_POST['search']; */
    $form_data = array();

    /* get total items  */
    $sql=("SELECT COUNT(user) AS ctr FROM tbl_activity_log");
    $result = mysqli_query($db, $sql);
    $rows = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
        $rows[] = $row;
    }
    if (!empty($rows)) {
        $form_data['success'] = true;
        $form_data['page_limit'] = $rows;
    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }

    $sql=("SELECT * FROM tbl_activity_log ORDER BY date DESC LIMIT $limit OFFSET $page ");
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