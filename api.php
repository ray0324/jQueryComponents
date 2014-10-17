<?php
header('Content-type: application/x-javascript');
$abc=array("uid"=>"1","username"=>"admin","groupid"=>1,"hash"=>md5("1admin"));
echo $_GET["callback"]."(".json_encode($abc).")";
?>