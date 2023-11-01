<?php
require 'connection.php';
$userDetais = json_decode(file_get_contents("php://input"));

$mobile = $userDetais->mobile;
$password = $userDetais->password;


if (empty($mobile)) {

    echo "Please enter your mobile no.";

} else if (preg_match("/07[0,1,2,4,5,6,7,8][0-9]+/", $mobile) == 0) {


    echo "Your mobile must be a sri lankan mobile number.";


} else if (empty($password)) {

    echo "Enter Password";

} else {

    $user_rs = Database::search("SELECT * FROM `user` WHERE `mobile`='" . $mobile . "' AND `password`='" . $password . "'");
    $un = $user_rs->num_rows;
    if ($un == 1) {
        // echo "Success";
       $user_details = $user_rs->fetch_assoc();
        echo json_encode($user_details);
    } else {
        echo "Invalid Details";
    }
}
?>