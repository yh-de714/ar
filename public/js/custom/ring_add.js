$(document).ready(function () {   
    $(document).on('click', '#add_stone .select-item', function() {
        $(this).toggleClass('active');
    });

    $(document).on('change', '#add_stone .input-checkbox', function() {
        if(this.checked) {
            $('#add_stone .select-item').addClass('active');
        }     
        else {
            $('#add_stone .select-item').removeClass('active');
        } 
    });

    $(document).on('click', '#add_material .select-item', function() {
        $(this).toggleClass('active');
    });

    $(document).on('change', '#add_material .input-checkbox', function() {
        if(this.checked) {
            $('#add_material .select-item').addClass('active');
        }     
        else {
            $('#add_material .select-item').removeClass('active');
        } 
    });


    $(document).on('click', '#add_surface .select-item', function() {
        $(this).toggleClass('active');
    });

    $(document).on('change', '#add_surface .input-checkbox', function() {
        if(this.checked) {
            $('#add_surface .select-item').addClass('active');
        }     
        else {
            $('#add_surface .select-item').removeClass('active');
        } 
    });

    $(document).on('click', '#ring_add .bottom-menu-wrap > ul > li > a', function(e) {
        e.preventDefault();
        $(this).addClass("active");   
        $(this).parent().siblings().find('a').removeClass('active');   

        $('.common-wrapper').removeClass('active');
        var index = $(this).attr('id');

        switch(index) {
            case 'ring': {
                $('#ring_upload').addClass('active');
                break;
            }
            case 'stone': {
                $('#add_stone').addClass('active');
                break;
            }
            case 'material': {
                $('#add_material').addClass('active');
                break;
            }
            case 'surface': {
                $('#add_surface').addClass('active');
                break;
            }
            case 'eyecatch': {
                $('#eyecatch_upload').addClass('active');
                break;
            }
            case 'ar': {
                $('#ar_publish').addClass('active');
                break;
            }
            default: {
                $('.common-wrapper').removeClass('active');
                $('#ring_upload').addClass('active');
                break;
            }
        }
       
    });

    
    $(document).on('click', '#ring_add .bottom-add-btn', function(e) {
        e.preventDefault();
        var stone_items = [], material_items = [], surface_items = [];
        var stone_list = $('#add_stone .select-item.active');
        var materail_list = $('#add_material .select-item.active');
        var surface_list = $('#add_surface .select-item.active');
        var ring_id = $('.ring-url-wrap').attr('id');
      
        stone_list.each(function( index, element ) {
            stone_items.push({
                'id': $(element).attr('id'),
                'img': $(element).find('.select-item-image img').attr('src'),
                'text': $(element).find('.select-item-txt').text().trim(),
                'price': $(element).find('.select-item-price span').text().trim()
            });
        });

        materail_list.each(function( index, element ) {
            material_items.push({
                'id': $(element).attr('id'),
                'img': $(element).find('.select-item-image img').attr('src'),
                'text': $(element).find('.select-item-txt').text().trim(),
                'price': $(element).find('.select-item-price span').text().trim()
            });
        });

        surface_list.each(function( index, element ) {
            surface_items.push({
                'id': $(element).attr('id'),
                'img': $(element).find('.select-item-image img').attr('src'),
                'text': $(element).find('.select-item-txt').text().trim(),
                'price': $(element).find('.select-item-price span').text().trim()
            });
        });

        if( typeof ring_id === "undefined" && typeof ring_model === 'undefined') {
            alert("Please Select Ring 3D Model");
            return;
        }
        var token = $('#_token').val();
        var data = new FormData();      
        data.append('model', ring_model);
        data.append('stone_items', JSON.stringify(stone_items));
        data.append('material_items', JSON.stringify(material_items));
        data.append('_token', token);
        data.append('surface_items', JSON.stringify(surface_items));
        data.append('ring_id', JSON.stringify(ring_id));
    
        $('.loader').addClass('show');
        $.ajax({
            url: '/uploadmodel',
            data: data,
            processData: false,
            contentType: false, 
            type: 'POST',
            success: function(response){
                $('.loader').removeClass('show');
                window.location.href= '/ring/' + response.id;
            },
            error: function(error) {
                $('.loader').removeClass('show');
                console.log(error);
                alert('ajax error!');
            },
            complete: function (e) {
                $('.loader').removeClass('show');
            }
        });
                
    });
});