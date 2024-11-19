$(document).ready(function () {    
    var w = $(window).width();
    
    // Left Menu
    $(".left-menu-wrap > ul > li > a").on("click", function (e) {       
        $(this).toggleClass("active");   
        $(this).parent().siblings().find('a').removeClass('active');            
                
        if( $('#left_' + $(this).attr('id')).hasClass('active')) {
            $('#left_' + $(this).attr('id')).toggleClass("active");      
        }                    
        else {
            $(".main-wrap").removeClass('active');
            $('#left_' + $(this).attr('id')).addClass("active"); 
        }


        if($(this).attr('id') === "ring") {
            $('.card-wrap').removeClass('show'); 
            $('.dyamond-select-wrap').removeClass('active');   
            if($('#model_size').hasClass('show')) {
                $('#model_size').toggleClass('show');  
                $('#right_status').toggleClass('show');              
            }
            else {
                $('#model_size').addClass('show');
                $('#right_status').removeClass('show');  
            }           
        }
        else {
            $('#model_size').removeClass('show');
        }

        if($(this).attr('id') === "dyamond") {            
            $('.card-wrap').removeClass('show'); 
            if(!$(this).hasClass('active')) {  
                $('#right_status').toggleClass('show');              
            }
            else {
                $('#right_status').removeClass('show'); 
            }       
            if(w < 768) {
                $('.dyamond-select-wrap').toggleClass('active');       
            }
        }

        if($(this).attr('id') === "material") {
            $('.card-wrap').removeClass('show');        
            $('.dyamond-select-wrap').removeClass('active');       
            if(!$(this).hasClass('active')) {  
                $('#right_status').toggleClass('show');  
                $('#material_card3').removeClass('show');            
            }
            else {
                $('#right_status').removeClass('show');  
                $('#material_card3').addClass('show');   
            }         
        }

        if($(this).attr('id') === "surface") {
            $('.card-wrap').removeClass('show'); 
            $('.dyamond-select-wrap').removeClass('active');   
            if(!$(this).hasClass('active')) {  
                $('#right_status').toggleClass('show');  
                $('#surface_card5').removeClass('show');             
            }
            else {
                $('#right_status').removeClass('show'); 
                $('#surface_card5').addClass('show');  
            }      
        }

        if($(this).attr('id') === "text") {
            $('.dyamond-select-wrap').removeClass('active');   
            $('.card-wrap').removeClass('show'); 
            $('#right_status').addClass('show'); 
        }
    });

    $('.size-item li').on('click', function() {
        if($(this).hasClass('active')) {
            $(this).toggleClass('active');
        }
        else {
            $('.size-item li').removeClass('active');
            $(this).addClass('active');
        }
        $('#size_number').html($(this).children('.size-item-number').text());
    });

    $('.dyamond-select .select-item').on('click', function() {
        $('.dyamond-select .select-item').removeClass('active');
        $(this).addClass('active');
    })

    $("#card_info").html("");

    $.getJSON(
    "./json/card-item.json",
    function (data) {
        if(w >= 1200) {
            $.each(data, function (i, item) {
                $( 
                    '<div id="' + item.kind + '_card' + (i+1) + '"' + 'class="card-wrap fade-in">' +
                        '<div class="card-image">' +
                            '<img src="' + 
                            item.imageurl +
                            '" alt="Dyamond Image" />' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<div class="card-label">' +
                                '<ul>' +
                                    '<li class="active"></li>' +
                                    '<li></li>' +
                                    '<li></li>' +
                                    '<li></li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="card-content-wrap">' +
                                '<div class="card-ttl">' +
                                    item.name +  
                                    '<span>' +
                                    item.subname +
                                    '</span>' +
                                '</div>' +
                                '<div class="card-txt">' +
                                    item.text +
                                '</div>' +
                            '</div>' +                        
                        '</div>' +
                    '</div>' 
                ).appendTo("#card_info");   
            });
        }
        else if(w > 768) {
            $.each(data, function (i, item) {
                $( 
                    '<div id="' + item.kind + '_card' + (i+1) + '"' + 'class="card-wrap fade-in">' +
                        '<div class="card-image">' +
                            '<img src="' + 
                            item.tb_imageurl +
                            '" alt="Dyamond Image" />' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<div class="card-label">' +
                                '<ul>' +
                                    '<li class="active"></li>' +
                                    '<li></li>' +
                                    '<li></li>' +
                                    '<li></li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="card-content-wrap">' +
                                '<div class="card-ttl">' +
                                    item.name +  
                                    '<span>' +
                                    item.subname +
                                    '</span>' +
                                '</div>' +
                                '<div class="card-txt">' +
                                    item.text +
                                '</div>' +
                            '</div>' +                        
                        '</div>' +
                    '</div>' 
                ).appendTo("#card_info");   
            });
        }
        else {
            $.each(data, function (i, item) {
                $( 
                    '<div id="' + item.kind + '_card' + (i+1) + '"' + 'class="card-wrap fade-in">' +
                        '<div class="card-image">' +
                            '<img src="' + 
                            item.sp_imageurl +
                            '" alt="Dyamond Image" />' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<div class="card-label">' +
                                '<ul>' +
                                    '<li class="active"></li>' +
                                    '<li></li>' +
                                    '<li></li>' +
                                    '<li></li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="card-content-wrap">' +
                                '<div class="card-ttl">' +
                                    item.name +  
                                    '<span>' +
                                    item.subname +
                                    '</span>' +
                                '</div>' +
                                '<div class="card-txt">' +
                                    item.text +
                                '</div>' +
                            '</div>' +                        
                        '</div>' +
                    '</div>' 
                ).appendTo("#card_info");   
            });
        }
      
    });

    
    $(document).on('click touchstart', '#main_viewer', function(e) {      
        if ( e.target == $('#main_viewer').children('canvas')[0]) {     
            $('.dyamond-select-wrap').removeClass('active');         
            $('.main-wrap').removeClass('active'); 
            $(".left-menu-wrap > ul > li > a").removeClass('active');
            $('#model_size').removeClass('show');
            $('.card-wrap').removeClass('show'); 
            $('#right_status').addClass('show');             
        }
    });

    $('.hamburger-wrapper').on('click', function(e) {
        e.preventDefault();
        $('.hamburger-menu').toggleClass('animate');
        $('.mobile-menu-overlay').toggleClass('visible');
        $('.header-top').toggleClass('active');
        $('#main_viewer').toggleClass('active');
    })
    $('.mobile-menu-overlay .menu-item > ul > li > a, .menu-btn').on('click', function (e) {
        e.preventDefault();
        $('.hamburger-menu').removeClass('animate');
        $('.mobile-menu-overlay').removeClass('visible');
        $('.header-top').toggleClass('active');
        $('#main_viewer').toggleClass('active');
    });

});

