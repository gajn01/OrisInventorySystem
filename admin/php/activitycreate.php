<?php
include("connection.php"); //Establishing connection with our database


$ip = file_get_contents('http://icanhazip.com/');
$sql_activity = "INSERT INTO tbl_activity_log (user , activity, ip_address) VALUES ('Admin', 'Logged out', '$ip')";
mysqli_query($db, $sql_activity);
$db->close();

?>