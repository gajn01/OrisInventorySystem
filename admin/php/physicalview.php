<?php
    include("connection.php"); 
    $limit = $_POST['limit'];
    $page = $_POST['page'];
    $search = $_POST['search'];
    $category_id = $_POST['category_id'];
    $form_data = array();

    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_physical_inventory WHERE product_category = $category_id");
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
    $sql=("SELECT * FROM tbl_physical_inventory WHERE product_category = $category_id AND (product_code LIKE '$search%' OR product_name LIKE '$search%' OR product_description LIKE '$search%' OR product_unit LIKE '$search%' OR product_location LIKE '$search%' OR product_person_incharge LIKE '$search%')  LIMIT $limit OFFSET $page ");
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