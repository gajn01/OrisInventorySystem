<?php
    include("connection.php"); 
    $product_code = $_POST['product_code'];
    $form_data = array();
    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_inventory");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['page_limit'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }

    $sql=("SELECT * FROM tbl_inventory WHERE product_code = '$product_code'" );
    $result= mysqli_query($db,$sql);
    $form_data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $form_data['success'] = true;
            $form_data['data'] = $row;
        }
    }else {
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
    echo json_encode($form_data);

   
?>