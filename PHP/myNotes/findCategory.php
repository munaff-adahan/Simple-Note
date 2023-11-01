<?php

require 'connection.php';

$c_rs = Database::search("SELECT * FROM `category`");
$c_rows = $c_rs->num_rows;
$c_types = array();

for($i=0; $i<$c_rows;$i++){
    $values = $c_rs->fetch_assoc();
    $c_array;
    $c_array["label"] = $values["name"];
    $c_array["value"] = $values["id"];

    $c_types[$i] = $c_array;

}

    echo json_encode($c_types);

?>