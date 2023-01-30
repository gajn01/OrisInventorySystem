<?php
    include("connection.php"); 
    $limit = $_POST['limit'];
    $page = $_POST['page'];
    $search = $_POST['search'];
    $account_id = $_POST['account_id'];

    /* Filter */
    $category = $_POST['category'];
    $status = $_POST['status'];
    $date_start = $_POST['dateStart'];
    $date_end = $_POST['dateEnd'];

    $form_data = array();
    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_history WHERE account_id = $account_id");
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



    $conditions = array();
    if($category != ""){
        $conditions[] = "product_category = '$category'";
    }
    if($status != ""){
        $conditions[] = "status = '$status'";
    }
    if($date_start != "" && $date_end != ""){
        $conditions[] = "date_requested BETWEEN '$date_start' AND '$date_end'";
    }
    $search_condition = "(product_name LIKE '$search%' OR full_name LIKE '$search%')";
    $conditions[] = $search_condition;
    $where_clause = join(" AND ", $conditions);
    $sql = "SELECT * FROM tbl_history WHERE  account_id = $account_id AND  $where_clause ORDER BY status ASC , date_requested DESC, id DESC  LIMIT $limit OFFSET $page";
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