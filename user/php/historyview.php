<?php
    include("connection.php"); 
    $limit = $_POST['limit'];
    $page = $_POST['page'];
    $search = $_POST['search'];
    $account_id = $_POST['account_id'];
    $form_data = array();
    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_history WHERE account_id = $account_id");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['page_limit'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT * FROM tbl_history WHERE account_id = $account_id AND (product_name LIKE '$search%' OR full_name LIKE '$search%' ) ORDER BY status ASC , date_requested DESC,id DESC  LIMIT $limit OFFSET $page ");
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