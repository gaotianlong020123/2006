<?php

$username = $_POST['username'];
$password = $_POST['password'];
$sql = "INSERT INTO `users` (`username`, `password`) VALUES($username,$password)";
$link = mysqli_connect('127.0.0.1', 'root', 'root', 'sdy');
$res = mysqli_query($link, $sql);
mysqli_close($link);

var_dump($res);



?>