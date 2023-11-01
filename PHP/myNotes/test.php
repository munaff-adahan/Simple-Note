<?php

require 'connection.php';

$user_rs = Database::search("SELECT * FROM `user_type`");
$type_rows = $user_rs->num_rows;
$user_types = array();

for($i=0; $i<$type_rows;$i++){
    $values = $user_rs->fetch_assoc();
    $user_array;
    $user_array["label"] = $values["name"];
    $user_array["value"] = $values["id"];

    $user_types[$i] = $user_array;

}

    echo json_encode($user_types);

?>