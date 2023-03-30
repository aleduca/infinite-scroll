<?php

header('Access-Control-Allow-Origin:http://127.0.0.1:5500');

$offset = (int)$_GET['offset'];

$connection = new PDO('mysql:host=localhost;dbname=blog_ci', 'root', '');
$query = $connection->query("select * from users limit 20 offset {$offset}");
echo json_encode($query->fetchAll());
