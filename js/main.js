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
    $(".various_button_new_post, .various_button_post_update").fancybox({
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

    //получаем и отправляем данные на главную страницу
    $('.button_student').on('click', function(event) {
        event.preventDefault();


        var name = $('.name_inputs').val();
        var last_name = $('.last_name_inputs').val();
        var number_group = $('.number_group_inputs').val();

        $('.n_s').html(name);
        $('.l_s').html(last_name);
        $('.g_s').html(number_group);
        $.fancybox.close();

        /*
        $.ajax({
            type: 'POST',
            url: "index.php",
            dataType: 'json',
            data:{
                name:name,
                last_name:last_name,
                number_group:number_group

            },
            success: function(data) {
                console.log(name);

            },
            error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
                //                    alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
                console.log(thrownError); // и тeкст oшибки
            }
        });
        */

    });
    /*Валидация полей для входа в админку*/
    $('.button_admin').click(function() {

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


                    $('.form_question table').append('<tr id=tr_'+data+'><td>'+data+'</td><td>'+question+'</td><td>'+variant_1+'</td>' +
                                                        '<td>'+variant_2+'</td><td>'+answer+'</td><td><center>'+point+'</center></td>' +
                                                        '<td><center><input type="checkbox" name="[check[]" value='+data+'></center></td></tr>'
                                                    );
                        $.fancybox.close();
                     },
                error:function (xhr, ajaxOptions, thrownError){
                    alert(thrownError); //выводим ошибку
                }
            });
        });


        /*Выводим в поля нужную запись для редактирования*/
        $('.various_button_post_update').click(function(e){
            e.preventDefault();
            var id = $( "input:checked" ).val();
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
                    alert(thrownError); //выводим ошибку
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
            var id = $( "input:checked" ).val();

            $.ajax({
                url : 'connect_bd.php',
                type : 'POST',
                dataType:'text',
                data :{question_update:question,
                    variant_1_update:variant_1,
                    variant_2_update:variant_2,
                    answer_update:answer,
                    point_update:point,
                    id_update:id
                },
                success:function(data){

                    /*Разобраться как заменить после редактирования*/
                    $('.form_question table tr[tr_=' + id + ']').replaceWith('<tr id=tr_'+id+'><td>'+id+'</td><td>'+question+'</td><td>'+variant_1+'</td>' +
                        '<td>'+variant_2+'</td><td>'+answer+'</td><td><center>'+point+'</center></td>' +
                        '<td><center><input type="checkbox" name="[check[]" value='+data+'></center></td></tr>'
                    );
                    $.fancybox.close();
                },
                error:function (xhr, ajaxOptions, thrownError){
                    alert(thrownError); //выводим ошибку
                }
            });

        });







});