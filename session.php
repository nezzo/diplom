<?php
session_start();
require_once('connect_bd.php');

$login = $_POST['login'];
$pass = $_POST['pass'];

if (isset($login)&&!empty($pass)){
    $admin = $a->admin($login,$pass);

    if($admin=="ok"){
        $_SESSION['admin'] = $admin;
        return $admin;
    }
}


