let surface_list=[
    "SILVER",
    "BRASS",
    "PINK GOLD",
    "18K GOLD",
    "PLATINUM"
]
let ring_id, surface = [];
function surface_click(item, elem){
    const index = surface.indexOf(item);
    if (index > -1) {
        surface.splice(index, 1); 
    }
    else{
        surface.push(item);
    }
    $(elem).toggleClass( "item-material-active" )
}

$(function(){
    ring_id = $('#ring_id').val();
    surface = $('#surface').val().split(",");
    let list_string = surface_list.map((item)=>(
        `<div class="item-material ${surface.indexOf(item) > -1 ? "item-material-active" : ""}" onclick="surface_click('${item}', this)">
                <div class="img-material">
                </div>
                <div class="name-material">${item}</div>
        </div>`
    )).join(" ");
    $("#surface-box").html(list_string);

    $("#submit").click(function(){
        
        let token = $('#_token').val();
        let data = new FormData();  
        data.append('ring_id', ring_id);
        data.append('surface', surface.join(","));
        data.append('_token', token);
        $.ajax({
            url: '/setsurface',
            data: data,
            processData: false,
            contentType: false, 
            type: 'POST',
            success: function(response){
                window.location.href= '/publish/' + response.id;
            },
            error: function(error) {
               
                console.log(error);
                alert('ajax error!');
            },
            complete: function (e) {
                
            }
        });
    })
})