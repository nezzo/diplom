<?php
session_start();
require_once('model.php');

$login = $_POST['login'];
$pass = $_POST['pass'];

if (isset($login)&&!empty($pass)){
    $admin = $model->admin($login,$pass);

    if($admin=="ok"){
        $_SESSION['admin'] = $admin;
        return $admin;
    }
}


