<?php


require 'connection.php';
$userDetais = json_decode(file_get_contents("php://input"));

$title = $userDetais->title;
$description = $userDetais->desc;
$category = $userDetais->category;
$mobile = $userDetais->mobile;

if (empty($title)) {

    echo "Enter a Note Title";

} else if (empty($description)) {

    echo "Enter the Description";

} else if (empty($category)) {

    echo "Select The Category";

} else {
    $rs = Database::search("SELECT * FROM `note` WHERE `title`='" . $title . "'AND `description`='" . $description . "' AND `category_id`='" . $category . "'");

    if ($rs->num_rows == 1) {
        echo "This Note Already Added";
    } else {
        $date = new DateTime();
        $timeZone = new DateTimeZone("Asia/Colombo");
        $date->setTimezone($timeZone);
        $date_time = $date->format("Y-m-d H:i:s");
        Database::iud("INSERT INTO `note` (`title`,`description`,`category_id`,`user_mobile`,`date`)VALUES('" . $title . "','" . $description . "','" . $category . "','" . $mobile . "','".$date_time."')");
        echo "Success";
    }
}

?>