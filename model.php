<?php
/*
ini_set('display_errors',1);
error_reporting(E_ALL ^E_NOTICE);
*/

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
                echo "Null";
            }
        }


     }

    /*Вывод в админке вопросов*/
    function question(){
        $stmt = self::$_db->query('SELECT * from question');
        //Установка fetch mode
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while($rows = $stmt->fetchAll())
        {
            if (!empty($rows)){
                return $rows;
            }else{
                echo "Null";
            }
        }

    }

    function del_post(){
        $id = $_POST['id'];

         if(isset($id)){
             $count = self::$_db->exec("DELETE FROM question WHERE id = '$id'");

        }
        return true;
    }

    function new_post(){
        $question = $_POST['question'];
        $variant_1 = $_POST['variant_1'];
        $variant_2 = $_POST['variant_2'];
        $variant_3 = $_POST['variant_3'];
        $answer = $_POST['answer'];


        if (isset($question)&& isset($variant_1)&& isset($variant_2)&& isset($variant_3)&& isset($answer)
            && !empty($question)&& !empty($variant_1)&& !empty($variant_2)&& !empty($variant_3)&& !empty($answer)){

            $stmt = self::$_db->prepare("INSERT INTO question (question, variant_1, variant_2,variant_3, answer)
                                        VALUES (:question, :variant_1, :variant_2,:variant_3, :answer)");

            $stmt->bindParam(':question', $question);
            $stmt->bindParam(':variant_1', $variant_1);
            $stmt->bindParam(':variant_2', $variant_2);
            $stmt->bindParam(':variant_3', $variant_3);
            $stmt->bindParam(':answer', $answer);
            $stmt->execute();
            $lastid = self::$_db->lastInsertId();

                echo"$lastid";
        }

        return  true;
    }

    function post_select()
    {
        $id = $_POST['id_select'];
        if (isset($id) && !empty($id)) {
            $stmt = self::$_db->query("SELECT * from question where id = '$id'");
            //Установка fetch mode
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $stmt->fetchAll();

            foreach ($rows as $row) {
                echo json_encode($row);

            }
        }
        return true;
    }

    /*Редактирование и перезаписывание в базе строки*/
    function post_update(){
        $question = $_POST['question_update'];
        $variant_1 = $_POST['variant_1_update'];
        $variant_2 = $_POST['variant_2_update'];
        $variant_3 = $_POST['variant_3_update'];
        $answer = $_POST['answer_update'];
        $id = $_POST['id_update'];
        $id_updated = (int) $_POST['id_updated'];


        if (isset($id_updated) && !empty($id_updated) && isset($id) && !empty($id) && isset($question) && isset($variant_1)
            && isset($variant_2) && isset($variant_3) && isset($answer)&& !empty($question) && !empty($variant_1)
            && !empty($variant_2) && !empty($variant_3) && !empty($answer)) {
                $stmt_update = self::$_db->prepare("UPDATE question set id = :id_updated, question = :question, variant_1 = :variant_1,  variant_2 = :variant_2,
                                                   variant_3 = :variant_3, answer = :answer   where id ='$id'");
                $stmt_update->bindParam(':question', $question);
                $stmt_update->bindParam(':variant_1', $variant_1);
                $stmt_update->bindParam(':variant_2', $variant_2);
                $stmt_update->bindParam(':variant_3', $variant_3);
                $stmt_update->bindParam(':answer', $answer);
                $stmt_update->bindParam(':id_updated', $id_updated);
                $stmt_update->execute();
        }
        return true;

    }

    function admin($login,$pass){
        $stmt = self::$_db->query("SELECT * from admin");

        //Установка fetch mode
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $rows = (array) $stmt->fetchAll();

        foreach($rows as $row){
            if ($row['login']==$login && $row['pass']==$pass){
                echo "ok";
            }else{
                echo "fail";
            }
        }

        return true;

    }

    /* Вывод оценки студента за тест*/
    function question_student_result(){

        $name = $_POST['name_result'];
        $last_name = $_POST['last_name_result'];
        $num_group = $_POST['num_group_result'];
        $data_test= date("Y-m-j, H:i:s");
        $point = $_POST['point_result'].'%';

        if (isset($name) && isset($last_name) && isset($num_group) && isset($point)
            && !empty($name) && !empty($last_name) && !empty($num_group)) {

            $stmt_student_result = self::$_db->prepare("INSERT INTO student (name, last_name, num_group, data, point)
                                        VALUES (:name, :last_name, :num_group, :data_test, :point)");
            $stmt_student_result->bindParam(':name', $name);
            $stmt_student_result->bindParam(':last_name', $last_name);
            $stmt_student_result->bindParam(':num_group', $num_group);
            $stmt_student_result->bindParam(':data_test', $data_test);
            $stmt_student_result->bindParam(':point', $point);
            $stmt_student_result->execute();
            $lastid = self::$_db->lastInsertId();

        }
        return true;

    }

    /*Вывод вопросов на главную*/
    function question_index(){
        $enter = $_POST['enter'];
        $mas = [];
        if($enter == "ok"){
            $stmt = self::$_db->query('SELECT * from question');
            //Установка fetch mode
            $stmt->setFetchMode(PDO::FETCH_ASSOC);

            $rows = (array) $stmt->fetchAll();

                foreach ($rows as $row) {
                    $mas[] = $row;

                 }
            echo json_encode($mas);

        }
        return true;
    }


}
$model = new Model();
$model->del_post();
$model->new_post();
$model->post_select();
$model->post_update();
$model->question_index();
$model->question_student_result();


