<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  
  require '../phpmailer/src/Exception.php';
  require '../phpmailer/src/PHPMailer.php';
  require '../phpmailer/src/SMTP.php';
 
  $host = "smtp.gmail.com";
  $port = 587;
  $secure = "tls";
//  or the following configurations through SSL should work as well. 
//  $port = 465;
//  $secure = "ssl";
  $username = "2023.oris@gmail.com";
  $password = "nkqhapfyrwockhus";

  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $body = $_POST['body'];
  
  try {
    $mailer = new PHPMailer(true);
    $mailer->IsHTML(true);
    $mailer->IsSMTP();
    $mailer->From = $username;
    $mailer->FromName = $username;
    $mailer->ClearAllRecipients();

    
    $mailer->AddAddress($email);
    $mailer->Subject = $subject;
    $mailer->Body = $body;

    $mailer->SMTPAuth   = true;       // enable SMTP authentication
    $mailer->SMTPSecure = $secure;    // sets the prefix to the servier
    $mailer->Host       = $host;      // sets GMAIL as the SMTP server
    $mailer->Port       = $port;      // set the SMTP port for the GMAIL server
    $mailer->Username   = $username;  // GMAIL username
    $mailer->Password   = $password;  // GMAIL password
    $result = $mailer->Send();  
    echo "Mail sent\n";
  } catch  (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ';
    var_dump($e);
  }  