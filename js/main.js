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
    $(".various_button_new_post").fancybox({
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
        /*НАДО доработать что бы можно было удалять  несколько штук сразу и нужно разобраться как перезагружать блок элементов*/
        $(".button_del_post").on("click", function(e) {
             e.preventDefault();
            var id = $( "input:checked" ).val();

            $.ajax({
                url : 'connect_bd.php',
                type : 'POST',
                dataType:'text',
                data :{id:id},
                success:function(data){
                        console.log(data);
                 //  $('.form_question').load('admin.php');

                },
                error:function (xhr, ajaxOptions, thrownError){
                    alert(thrownError); //выводим ошибку
                }
            });

        });

        /*Добавляем  новый вопрос-ответ в базу*/
        $('.new_post_button').click(function(){
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

                    //  $('.form_question').load('admin.php');

                },
                error:function (xhr, ajaxOptions, thrownError){
                    alert(thrownError); //выводим ошибку
                }
            });


        });






});