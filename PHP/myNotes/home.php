<?php

require 'connection.php';
$userDetais = json_decode(file_get_contents("php://input"));

$mobile = $userDetais->mobile;
$fname =$userDetais->fname;
$lname =$userDetais->lname;
$userType =$userDetais->usertype;
$password =$userDetais->password;


if(empty($mobile)){

    echo "Enter Mobile Number";

}else if(preg_match("/07[0,1,2,4,5,6,7,8][0-9]+/",$mobile)==0){

    echo "Invalid Mobile Number!Please enter valid Sri Lankan Mobile Number";
    
    
}else  if(empty($fname)){

    echo "Enter First Name";

}else  if(empty($lname)){

    echo "Enter Last Name";

}else  if(empty($userType)){

    echo "Select Your User Type.";

}else  if(empty($password)){

    echo "Create a password.";

}else{
    $rs=Database::search("SELECT * FROM `user` WHERE `mobile`='".$mobile."'");

    if($rs->num_rows==1){
        echo "This mobile number already in use.Try Sign In or enter Different Mobile Number";
    }else{
        Database::iud("INSERT INTO `user` VALUES('".$mobile."','".$fname."','".$lname."','".$userType."','".$password."')");
        echo "Success";
    }


}






?>