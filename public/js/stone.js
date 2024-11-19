let stone_list=[
    "Garnet",
    "Amethyst",
    "Aquamarine",
    "Diamond",
    "Emerald",
    "Moonstone",
    "Ruby",
    "Peridot",
    "Sapphire",
    "Tourmaline",
    "Citrine",
    "Tanzanite"
]

let ring_id
let stones = [];

function stone_click(item, elem){
    
    const index = stones.indexOf(item);
    if (index > -1) {
        stones.splice(index, 1); 
    }
    else{
        stones.push(item);
    }
    $(elem).toggleClass( "item-stone-active" )
}

$(function(){
    ring_id = $('#ring_id').val();
    stones = $('#stone').val().split(",");
    console.log(stones)
    let list_string = stone_list.map((item)=>(
        `<div class="item-stone ${stones.indexOf(item) > -1 ? "item-stone-active" : ""}" onclick="stone_click('${item}', this)">
            <div class="img-stone">
                <img src="/img/${item}.png" alt="stone">
            </div>
            <div class="name-stone">${item}</div>
        </div>`
    )).join(" ");
    $("#stone-box").html(list_string);
    $("#submit").click(function(){
        let token = $('#_token').val();
        let data = new FormData();  
        data.append('ring_id', ring_id);
        data.append('stone', stones.join(","));
        data.append('_token', token);
        $.ajax({
            url: '/setstone',
            data: data,
            processData: false,
            contentType: false, 
            type: 'POST',
            success: function(response){
               
                console.log(response)
                window.location.href= '/surface/' + response.id;
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