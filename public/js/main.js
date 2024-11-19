var belongings = "";
var processing = "";
var material = [];
var amount = "";

function toggleMenu() {
    document.getElementById("top_menu").classList.toggle("active");
    document.getElementById("menu_toggle_btn").classList.toggle("active");
}

function toggleBannerModal(id) {
    document.getElementById('top_banner_modal_' + id).classList.add('active');

    var bannerModals = document.getElementsByClassName('banner-modal');
    let items = document.querySelectorAll(".banner-con02-list")
    for(let i = 0; i < items.length; i++){        
        items[i].onclick = function(){
            for(let i = 0; i < items.length; i++){
                items[i].classList.remove("active")  
            }
            items[i].classList.add("active")
            document.querySelectorAll(".banner-con02-btn")[id - 1].classList.add("active")
            
        }
    }
    // for (var i = 0; i < bannerModals.length; i++ ) {
    //     if (bannerModals[i].classList.contains('active')) bannerModals[i].classList.remove('active');
    // }
}

function closeBannerModal(e, id, flag) {
    // alert(id)
    var modalbody = document.getElementById("top_banner_modal_" + id);
    if (e.target.id == "top_banner_modal_" + id || flag=="close") 
    {
        modalbody.classList.remove('active');
        let items = document.querySelectorAll(".banner-con02-list")
        for(let i = 0; i < items.length; i++){
    	   items[i].classList.remove("active")  
        }
        document.querySelectorAll(".banner-con02-btn")[id - 1].classList.remove("active");
    }
    
    
}

function usertype(type){
    document.getElementById("usertype").value = type
    if(type==0){
        if (!document.getElementById("client").classList.contains('active')){
            document.getElementById("company").classList.remove('active')
            document.getElementById("client").classList.add('active')
        }
    }
    else{
        if (!document.getElementById("company").classList.contains('active')){
            document.getElementById("client").classList.remove('active')
            document.getElementById("company").classList.add('active')
        }
    }
}

function activetab(tab){
    var banertab = document.getElementsByClassName('banner-tab');
    var banner_input = document.getElementsByClassName('banner-con01-input-con');
    for (var i = 0; i < banertab.length; i++ ) {
        if (banertab[i].classList.contains('active')) banertab[i].classList.remove('active');
    }
    for (var i = 0; i < banner_input.length; i++ ) {
        if (banner_input[i].classList.contains('active')) banner_input[i].classList.remove('active');
    }
    banertab[tab-1].classList.add('active');
    banner_input[tab-1].classList.add('active');
}






