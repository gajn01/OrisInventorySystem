<?php
    include("connection.php"); 
    $account_id = $_POST['account_id'];
    $form_data = array();

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT * FROM tbl_history WHERE account_id = $account_id ORDER BY status ASC , date_requested DESC,id DESC ");
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