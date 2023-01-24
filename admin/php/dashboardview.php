<?php
    include("connection.php"); 

    $form_data = array();
    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_inventory");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['material'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }

    /* get total Account  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_account");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['account'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }

     /* get total Account  */
     $sql=("SELECT COUNT(id) AS ctr FROM tbl_history WHERE status != '2'");
     $result = mysqli_query($db, $sql);
     $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
     if($fetch){
         $form_data['success'] = true;
         $form_data['requisition'] = $fetch;
     }else{
         $form_data['success'] = false;
         $form_data['error_msg'] = "No records!";
     }


     $sql=("SELECT product_category as label , COUNT(id) as y FROM `tbl_inventory` GROUP BY product_category");
     $result = mysqli_query($db, $sql);
     $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
     if($fetch){
         $form_data['success'] = true;
         $form_data['material_graph'] = $fetch;
     }else{
         $form_data['success'] = false;
         $form_data['error_msg'] = "No record found!";
     }
    echo json_encode($form_data);

   
?>