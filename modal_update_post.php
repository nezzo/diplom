<link rel="stylesheet" href="css/bootstrap.min.css" xmlns="http://www.w3.org/1999/html">
<link rel="stylesheet" href="css/style.css">
<script type="text/javascript" src="tinymce/tinymce.min.js"></script>
<script type="text/javascript">
    tinyMCE.init({
        selector:"textarea",
        language:"ru",
        theme:"modern",
        gecko_spellcheck:"true",
        plugins : "image,code,textcolor,layer,example,table"
    });
</script>
<form class="update_post_form" action="#" method="post">
    <h3>Редактировать запись</h3>
    <label>Номер вопроса</label><br/>
    <input name="id" class="update_post_id" size="42" maxlength="42" type="text" placeholder="Номер вопроса"><br/>
    <label style="padding-top:25px;">Введите вопрос</label>
    <textarea class="update_post_question" rows="4" cols="100" name="question" placeholder="Введите вопрос"></textarea>
    <label style="padding-top:25px;">Первый вариант ответа</label>
    <textarea class="update_post_variant_1" rows="4" cols="100" name="variant_1" placeholder="Первый вариант ответа"></textarea>
    <label style="padding-top:25px;">Второй вариант ответа</label>
    <textarea class="update_post_variant_2" rows="4" cols="100" name="variant_2" placeholder="Второй вариант ответа"></textarea>
    <label style="padding-top:25px;">Третий вариант ответа</label>
    <textarea class="update_post_variant_3" rows="4" cols="100" name="variant_3" placeholder="Третий вариант ответа"></textarea>
    <label style="padding-top:25px;">Правильный вариант ответа</label>
    <textarea class="update_post_answer" rows="4" cols="100" name="answer" placeholder="Правильный вариант ответа"></textarea>
    <button class="update_post_button">Сохранить</button>
</form>
<script src="js/main.js"></script>
