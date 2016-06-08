
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/jQuizler.css">
    <link rel="stylesheet" href="css/fancybox.css">
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
<header>
 <div class="container-fluid">
     <div class="row">
    <div class="col-md-6">
    <div class="student">
            <h4>Анкета студента</h4>
        <div class="name_student">
            <label>Имя:</label>
            <div class='n_s'></div>

        </div>
        <div class="last_name_student">
            <label>Фамилия:</label>
            <div class='l_s'></div>
        </div>
        <div class="number_group">
            <label>Группа:</label>
            <div class='g_s'></div>
        </div>

        <a class="various_student fancybox.ajax" href="modal_student.php">Изменить данные</a>
    </div>
        </div>

         <div class="col-md-6">
         <div class="admin">
        <a class="various_admin fancybox.ajax" href="modal_admin.php">Вход для администратора</a>
        </div>
        </div>
   </div>
</div>
</header>
<main>
    <div class="container-fluid">
        <div class="row">
                <div class="col-md-12">
                    <div class="test_mysql">
                            <h3>Онлайн тестирование по владению навыками Mysql</h3>

                    </div>
                </div>
        </div>
    </div>

</main>
<footer>
    <script src="js/jquery.min.js"></script>
    <script src="js/jQuizler.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <script src="js/fancybox.js"></script>
    <script src="js/main.js"></script>

</footer>


</body>
</html>