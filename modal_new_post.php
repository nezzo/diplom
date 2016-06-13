<link rel="stylesheet" href="css/bootstrap.min.css">
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

<form class="new_post_form" action="#" method="post">
    <h3>Добавить новую запись</h3>
    <label>Введите вопрос</label>
    <textarea class="new_post_question" rows="4" cols="100" name="question" placeholder="Введите вопрос"></textarea>
    <label style="padding-top:25px;">Первый вариант ответа</label>
    <textarea class="new_post_variant_1" rows="4" cols="100" name="variant_1" placeholder="Первый вариант ответа"></textarea>
    <label style="padding-top:25px;">Второй вариант ответа</label>
    <textarea class="new_post_variant_2" rows="4" cols="100" name="variant_2" placeholder="Второй вариант ответа"></textarea>
    <label style="padding-top:25px;">Третий вариант ответа</label>
    <textarea class="new_post_variant_3" rows="4" cols="100" name="variant_3" placeholder="Третий вариант ответа"></textarea>
    <label style="padding-top:25px;">Правильный вариант ответа</label>
    <textarea class="new_post_answer" rows="4" cols="100" name="answer" placeholder="Правильный вариант ответа"></textarea>
    <button class="new_post_button">Сохранить</button>
</form>
<script src="js/main.js"></script>

