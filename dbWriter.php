<?php
// mysql connect ____________________________________________________________
    $user = 'root'; 
    $password = 'B954dm1n';
    $db = 'bit_wifi_login';
    $host = '192.168.100.20';
    $port = 3306;
    
    $conn = new mysqli("$host:$port", $user, $password);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    } 
    //__________________________________________________________________________
//______________________________________________________________________________________

// FIELD CHECK
$postArr = $_POST;
$hometownArr = $postArr['response']['hometown'];

if(isset($postArr['email'])) {
    $email = $postArr['email'];
}
else{ 
    $email = $postArr['response']['email'];
    }

$name =  $postArr['response']['name'];
$gender = $postArr['response']['gender'];
$profileID = $postArr['response']['id'];
$hometown = $hometownArr['name'];
$locale = $postArr['response']['locale'];

//var_dump($_POST);

 $sql = "INSERT INTO bit_wifi_lofin.visitantes (email,date,name,gender,hometown,locale,type,profile)
                          VALUES('".$email."',NOW(),'".$name."','".$gender."','".$hometown."','".$locale."','".$_GET['type']."','".$profileID."');";
          
echo mysqli_query($conn, $sql) or die(mysqli_error($conn));


mysqli_close($conn);
?>