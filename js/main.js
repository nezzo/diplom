$(document).ready(function() {

    /*Вызов модального окна*/
    $(".various_student").fancybox({
        maxWidth	: 380,
        maxHeight	: 400,
        fitToView	: false,
        width		: '70%',
        height		: '40%',
        autoSize	: false,
        closeClick	: false,
        openEffect	: 'none',
        closeEffect	: 'none'
    });

    $(".various_admin").fancybox({
        maxWidth	: 380,
        maxHeight	: 400,
        fitToView	: false,
        width		: '70%',
        height		: '32%',
        autoSize	: false,
        closeClick	: false,
        openEffect	: 'none',
        closeEffect	: 'none'
    });
    $(".various_button_new_post,.various_button_post_select").fancybox({
        maxWidth	: 900,
        maxHeight	: 400,
        fitToView	: false,
        width		: '100%',
        height		: '100%',
        autoSize	: false,
        closeClick	: false,
        openEffect	: 'none',
        closeEffect	: 'none'
    });

    /*НАДО РАЗОБРАТЬСЯ КАК ВЫВОДИТЬ ВОПРОСЫ В ЦЫКЛЕ И КОЛИЧЕСТВО СКОЛЬКО В БАЗЕ СТОЛЬКО ТО И НА ГЛАВНОЙ, ЧТО БЫ АВТОМАТОМ
    * ВЫВОДИЛОСЬ КОЛИЧЕСТВО ВОПРОСОВ И САМИ ВОПРОСЫ И ОТВЕТЫ В ЦЫКЛЕ ПОДСТАВЛЯЛИСЬ
    * НАДО ОРГАНИЗОВАТЬ ЗАПИСЬ В БД ОЦЕНКУ СТУДЕНТА  И ЕЩЕ КРИВО РАБОТАЕТ СТИЛЬ ПО ТЕСТУ В index.html ВСЕ КРАСИВО У МЕНЯ НЕТ
    * */
    //получаем и отправляем данные о результате в базу (функция отвечает за тестирование)
    $('.button_student').on('click', function(event) {
        event.preventDefault();


        var name = $('.name_inputs').val();
        var last_name = $('.last_name_inputs').val();
        var number_group = $('.number_group_inputs').val();

        if (name !='' && last_name !='' && number_group !=''){
            $('.n_s').html(name);
            $('.l_s').html(last_name);
            $('.g_s').html(number_group);
            $.fancybox.close();
            var questions = [
                {
                    type: "choose",
                    question: "<h3>Вопрос 1</h3>",
                    answers: [
                        "Ответ 1",
                        "Ответ 2",
                        "Ответ 3"
                    ],
                    correct: [1]
                },
                {
                    type: "choose",
                    question: "<h3>Вопрос 2</h3>",
                    answers: [
                        "Ответ 1",
                        "Ответ 2",
                        "Ответ 3"
                    ],
                    correct: [2]
                },
                {
                    type: "choose",
                    question: "<h3>Вопрос 3</h3>",
                    answers: [
                        "Ответ 1",
                        "Ответ 2",
                        "Ответ 3"
                    ],
                    correct: [3]
                }
            ];
             $('.test_mysql').replaceWith("<div id='jQuizler' class='main-quiz-holder'>"+
                                         "<h3>Тест</h3><button class='btn btn-large'>Старт</button>" +
                                            "</div>");
            $("#jQuizler").jQuizler(questions);

        }else{
            alert("Не все поля заполнены!");
        }

    });
    /*Валидация полей для входа в админку и отправляем данные для проверки*/
    $('.button_admin').click(function(e) {
        e.preventDefault();
        $(".form_admin").validate({

            rules:{

                login:{
                    required: true,
                    minlength: 4,
                    maxlength: 16
                },

                pass:{
                    required: true,
                    minlength: 6,
                    maxlength: 16
                }
            },

            messages:{

                login:{
                    required: "Это поле обязательно для заполнения",
                    minlength: "Логин должен быть минимум 4 символа",
                    maxlength: "Максимальное число символо - 16"
                },

                pass:{
                    required: "Это поле обязательно для заполнения",
                    minlength: "Пароль должен быть минимум 6 символа",
                    maxlength: "Пароль должен быть максимум 16 символов"
                }

            }

        });

        var login = $('.login_input').val();
        var pass = $('.pass_input').val();
        $.ajax({
            url : 'session.php',
            type : 'POST',
            dataType:'text',
            data :{login:login,
                   pass:pass
                  },
            success:function(data){
                console.log(data);
                if(data == "ok"){
                    document.location.href='admin.php';
                }else{
                    $('.wrong_password').css('display','block');
                }
            },
            error:function (xhr, ajaxOptions, thrownError){
                alert(thrownError); //выводим ошибку
            }
        });


    });

        /*Удаляем не нужные строки в таблице*/
        $(".button_del_post").click(function(e) {
             e.preventDefault();
            var id = $( "input:checked" ).val();

            $.ajax({
                url : 'connect_bd.php',
                type : 'POST',
                dataType:'text',
                data :{id:id},
                success:function(data){
                    $("#tr_"+id).remove();
                },
                error:function (xhr, ajaxOptions, thrownError){
                    alert(thrownError); //выводим ошибку
                }
            });

        });


        /*Добавляем  новый вопрос-ответ в базу*/
        $('.new_post_button').click(function(e) {
            e.preventDefault();
            var question = $('.new_post_question').val();
            var variant_1 = $('.new_post_variant_1').val();
            var variant_2 = $('.new_post_variant_2').val();
            var answer = $('.new_post_answer').val();
            var point = $('.new_post_point').val();

            if( question !="" && variant_1!="" && variant_2!=""&& answer!="" && point!="" ){
                $.ajax({
                    url : 'connect_bd.php',
                    type : 'POST',
                    dataType:'text',
                    data :{question:question,
                        variant_1:variant_1,
                        variant_2:variant_2,
                        answer:answer,
                        point:point
                    },
                    success:function(data){


                        $('.form_question table').append('<tr id=tr_'+data+'><center><td>'+data+'</td></center><td>'+question+'</td><td>'+variant_1+'</td>' +
                            '<td>'+variant_2+'</td><td>'+answer+'</td><td><center>'+point+'</center></td>' +
                            '<td><center><input type="checkbox" name="[check[]" value='+data+'></center></td></tr>'
                        );
                        $.fancybox.close();
                    },
                    error:function (xhr, ajaxOptions, thrownError){
                        alert(thrownError); //выводим ошибку
                    }
                });

            }else{
                alert("Заполните поля");
            }


        });


        /*Выводим в поля нужную запись для редактирования*/
        $('.various_button_post_select').click(function(e){
            e.preventDefault();
            var id = $( "input:checked" ).val();
            console.log(id);

                $.ajax({
                    url : 'connect_bd.php',
                    type : 'POST',
                    dataType:'json',
                    data :{id_select:id},
                    success:function(data){
                        setTimeout(function() {
                            $('.update_post_question').val(data.question);
                            $('.update_post_variant_1').val(data.variant_1);
                            $('.update_post_variant_2').val(data.variant_2);
                            $('.update_post_answer').val(data.answer);
                            $('.update_post_point').val(data.point);
                        }, 100);
                    },
                    error:function (xhr, ajaxOptions, thrownError){
                       //  alert(thrownError); //выводим ошибку
                    }
                });
        });

        /*Редактируем  строку и отправляем назад в базу для обновления строки*/
        $('.update_post_button').click(function(e) {
            e.preventDefault();
            var question = $('.update_post_question').val();
            var variant_1 = $('.update_post_variant_1').val();
            var variant_2 = $('.update_post_variant_2').val();
            var answer = $('.update_post_answer').val();
            var point = $('.update_post_point').val();
            var id = $("input:checked").val();

            if( question !="" && variant_1!="" && variant_2!=""&& answer!="" && point!="" ) {
               $.ajax({
                    url: 'connect_bd.php',
                    type: 'POST',
                    dataType: 'text',
                    data: {
                        question_update: question,
                        variant_1_update: variant_1,
                        variant_2_update: variant_2,
                        answer_update: answer,
                        point_update: point,
                        id_update: id
                    },
                    success: function (data) {
                        $("#tr_" + id + "").replaceWith("<tr id=tr_" + id + "><td>" + id + "</td><td>" + question + "</td><td>" + variant_1 + "</td>" +
                            "<td>" + variant_2 + "</td><td>" + answer + "</td><td><center>" + point + "</center></td>" +
                            "<td><center><input type='checkbox' name='[check[]' value=" + id + "></center></td></tr>"
                        );
                        $.fancybox.close();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(thrownError); //выводим ошибку
                    }
                });
            }else{
                alert("Заполните поля");
            }

        });

    $('.pr').click(function(){

        var exit = "exit";

        $.ajax({
            url: 'admin.php',
            type: 'POST',
            dataType: 'text',
            data: {exit:exit },
            success: function (data) {
                document.location.href='index.php';
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError); //выводим ошибку
            }

        });

    });



});