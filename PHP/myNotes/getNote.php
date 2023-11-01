<?php

require 'connection.php';
$userDetais = json_decode(file_get_contents("php://input"));

$mobile = $userDetais->mobile;

$rs = Database::search("SELECT `note`.title,`note`.`description`,`category`.`name`,`note`.`date`,`note`.`user_mobile`
FROM `note`
INNER JOIN `category` ON `note`.`category_id`=`category`.`id`
WHERE `user_mobile`='" . $mobile . "'  ORDER BY `note`.`date` DESC");
$note = array();
if($rs->num_rows !=0 ){
    for($i=0; $i<$rs->num_rows; $i++){
       $values = $rs->fetch_assoc();
        $note[$i] = $values;
    }
}
echo json_encode($note);

?>