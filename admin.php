<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/fancybox.css">
<link rel="stylesheet" href="css/tabs_style.css">
<link rel="stylesheet" href="css/style.css">
<?php session_start();
require_once('connect_bd.php');
$student= (array) $a->result_student();
$question= (array) $a->question();
$exit = $_POST['exit'];

if($_SESSION['admin'] !="ok")
{
   header("Location: index.php");

}

if ($exit=="exit"){
    unset($_SESSION['admin']);
    }
?>
            <div class='container-fluid'>
                <div class='row'>
                     <div class='col-md-12'>
                         <div class='admin_tools'>
                            <div class='tabs'>
                                    <ul>
                                        <li>Результаты студентов</li>
                                        <li>Вопрос-ответ</li>
                                        <li class='pr'>Выход</li>
                                    </ul>
                                <div>
                                    <div class='result'>
                                     <table>
                                         <thead>
                                             <th>Имя</th>
                                             <th>Фамилия</th>
                                             <th>Группа</th>
                                             <th>Дата тестирования</th>
                                             <th>Оценка</th>
                                        </thead>
                                        <tbody>

                                    <?php foreach ($student as $row):?>
                                    <tr>
                                        <td><?=$row['name'];?></td>
                                        <td><?=$row['last_name'];?></td>
                                        <td><?=$row['num_group'];?></td>
                                        <td><?=$row['data'];?></td>
                                        <td><?=$row['point'];?></td>
                                    </tr>
                                    <?php endforeach;?>
                                     </table>
                                    </div>
                                </div>
                                <div>
                                    <div class='question_answer'>
                                    <div class='buttons'>
                                    <a href='modal_new_post.php' class='various_button_new_post fancybox.ajax'>+Добавить</a>
                                    <a href='modal_update_post.php' class='various_button_post_select fancybox.ajax'>~Редактировать</a>
                                    <a href='#' class='button_del_post'>-Удалить</a>
                                    </div>
                                    <form class='form_question' action='connect_bd.php' name='table' method='POST'>
                                     <table>
                                         <thead>
                                         <th>№</th>
                                         <th>Вопрос</th>
                                         <th>Первый вариант ответа</th>
                                         <th>Второй вариант ответа</th>
                                         <th>Правильный ответ</th>
                                         <th>Балл за правильный ответ</th>
                                         <th>Выделить</th>
                                         </thead>
                                         <tbody>

                                         <?php foreach ($question as $row):?>
                                             <tr id="tr_<?=$row['id'];?>">
                                                 <td><center><?=$row['id'];?></center></td>
                                                 <td><?=$row['question'];?></td>
                                                 <td><?=$row['variant_1'];?></td>
                                                 <td><?=$row['variant_2'];?></td>
                                                 <td><?=$row['answer'];?></td>
                                                 <td><center><?=$row['point'];?></center></td>
                                                 <td><center><input type='checkbox' name='check[]' value='<?=$row['id'];?>'></center></td>
                                             </tr>
                                         <?php endforeach;?>
                                         </tbody>

                                     </table>
                                    </form>
                                    </div>

                                <div>
                                    <div class='exit'></div>

                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
            </div>

<script src="js/jquery.min.js"></script>
<script src="js/fancybox.js"></script>
<script src="js/lighttabs.js"></script>
<script src="js/main.js"></script>

