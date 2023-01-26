<?php
    include("connection.php"); 
    $limit = $_POST['limit'];
    $page = $_POST['page'];
    $search = $_POST['search'];
    $form_data = array();

    if($search == "pending" || $search == "Pending"){
        $search = 1;
    }else if($search == "approved" || $search == "Approved"){
        $search = 2;
    }else if($search == "rejected" || $search == "Rejected"){
        $search = 3;
    }
    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_history");
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
    $sql=("SELECT * FROM tbl_history  WHERE (product_category LIKE '$search%' OR product_name LIKE '$search%' OR full_name LIKE '$search%' OR status LIKE '$search%' ) ORDER BY date_requested DESC , status ASC LIMIT $limit OFFSET $page  ");
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