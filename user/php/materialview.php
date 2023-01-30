<?php
    include("connection.php"); 
    $limit = $_POST['limit'];
    $page = $_POST['page'];
    $search = $_POST['search'];
    $category_id = $_POST['category_id'];
    $form_data = array();

    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_inventory WHERE product_category = '$category_id' AND  product_quantity != 0 ");
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


    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT * FROM tbl_inventory WHERE product_category = $category_id AND  product_quantity != 0  AND (product_name LIKE '$search%' OR product_description LIKE '$search%' OR product_unit LIKE '$search%' OR product_location LIKE '$search%' OR product_person_incharge LIKE '$search%')  LIMIT $limit OFFSET $page ");
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