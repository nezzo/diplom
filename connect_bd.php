<?php

class Model {

    private  $user = 'root';
    private  $pass = 1111111;
    private static $_db;

    /*Соединени с базой*/
     function __construct (){
        try {
            self::$_db = new PDO('mysql:host=localhost;dbname=diplom', $this->user, $this->pass);
            self::$_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$_db->exec("set names utf8");
             }
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    /*Выборка с базы по результатам студентов*/
    function result_student(){

        $stmt = self::$_db->query('SELECT * from student');
         //Установка fetch mode
         $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while($rows = $stmt->fetchAll())
        {
            if (!empty($rows)){
                return $rows;
            }else{
                return "Null";
            }
        }

     }

    function question(){
        $stmt = self::$_db->query('SELECT * from question');
        //Установка fetch mode
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while($rows = $stmt->fetchAll())
        {
            if (!empty($rows)){
                return $rows;
            }else{
                return "Null";
            }
        }

    }

    function del_post(){
        $id = $_POST['id'];

         if(isset($id)){
             $count = self::$_db->exec("DELETE FROM question WHERE id = '$id'");
             return true;
        }

    }

    function new_post(){
        $question = $_POST['question'];
        $variant_1 = $_POST['variant_1'];
        $variant_2 = $_POST['variant_2'];
        $answer = $_POST['answer'];
        $point = $_POST['point'];


        if (isset($question)&& isset($variant_1)&& isset($variant_2)&& isset($answer)&& isset($point)&&
            !empty($question)&& !empty($variant_1)&& !empty($variant_2)&& !empty($answer)&& !empty($point)){

            $stmt = self::$_db->prepare("INSERT INTO question (question, variant_1, variant_2,answer,point)
                                        VALUES (:question, :variant_1, :variant_2, :answer,:point)");
            $stmt->bindParam(':question', $question);
            $stmt->bindParam(':variant_1', $variant_1);
            $stmt->bindParam(':variant_2', $variant_2);
            $stmt->bindParam(':answer', $answer);
            $stmt->bindParam(':point', $point);
            $stmt->execute();

            return true;
        }
    }
}
$a = new Model();
$a->del_post();
$a->new_post();

