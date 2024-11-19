function click_showmore(id, elem){
    // $('.btn-delete-ring').addClass("d-none");
    $(`#ring-${id}`).toggleClass("d-none");

}

function delete_item(id){
    $('.btn-delete-ring').addClass("d-none");
    let token = $('#_token').val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': token
        }
    });

    $.ajax({
        url: `/ring/${id}`,
        processData: false,
        contentType: false, 
        type: 'delete',
        success: function(response){
            get_data()
        },
        error: function(error) {
            
            console.log(error);
            alert('ajax error!');
        },
        complete: function (e) {
            
        }
    })
}

function get_data(){
    let token = $('#_token').val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': token
        }
    });
    $.ajax({
        url: '/rings',
        processData: false,
        contentType: false, 
        type: 'GET',
        success: function(response){
            if(response.rings.length > 0){
                $(".board-empty").addClass("d-none");
                $(".board-full").removeClass("d-none");
            
                let list_string = response.rings.map((item)=>(
                    `
                    <div class="ring">
                        <a href="/update/${item.id}"><img src="/uploads/${item.image}" alt="ring"></a>
                        <div class="content-ring">
                            <div class="name-ring">${item.name}</div>
                            <div class="btn-showmore-ring" onclick="click_showmore('${item.id}', this)" >.<br>.<br>.</div>
                            <div class="btn-delete-ring d-none" id="ring-${item.id}" onclick="delete_item('${item.id}')" >Delete</div>
                        </div>
                    </div>
                    `
                )).join(" ");
                $("#rings-box").html(list_string);
            }
        },
        error: function(error) {
            
            console.log(error);
            alert('ajax error!');
        },
        complete: function (e) {
            
        }
    });
}


$(function(){
    get_data()
})