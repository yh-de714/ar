$(document).ready(function () {    
    // Left Menu
    // $(document).on("click", ".left-menu-wrap > ul > li > a", function (e) {       
    //     $(this).toggleClass("active");   
    //     $(this).parent().siblings().find('a').removeClass('active');      
    // });

    
    $(document).on('blur', "#user_url", function () { 
        $('#user_url').val($(this).val().replace(/[^一-龠ぁ-ゔァ-ヴーa-zA-Z0-9ａ-ｚＡ-Ｚ０-９々〆〤\s\-]/ug, '').trim().replace(/\s+/g, "-"));
        if ($('#user_url').val() == null || $('#user_url').val() == "" || $('#user_url').val().length < 4) {
            alert("Field is not 4 characters minimum!");
            return false;
        }
    });

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    $(document).on('blur', '#user_email', function() {
        if(validateEmail($('#user_email').val()) == null) {
            alert("Input email Incorrect!");
            $('#user_email').val("");
        }
    });




 

});

