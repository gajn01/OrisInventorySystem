<?php
include("global.php"); 

if($is_prod){
    /* Live server */
    /* define('DB_SERVER', '68.178.149.50');
    define('DB_USERNAME', 'oris');
    define('DB_PASSWORD', 'Q=@Ukd9_7;1');
    define('DB_DATABASE', 'oris'); */

    define('DB_SERVER', 'sql207.ezyro.com');
    define('DB_USERNAME', 'ezyro_33324291');
    define('DB_PASSWORD', 'p0xvlvjwov');
    define('DB_DATABASE', 'ezyro_33324291_oris');
}else{
    /* Localhost */
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', '');
    define('DB_DATABASE', 'oris');
}
$db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
 }

?>

