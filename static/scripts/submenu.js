function showPencilIcon() {
    $("a.pencil").css("display","block");
    $('li').on('mouseover mouseout',function(){
        $(this).find('.pencil').toggle();
    });
}
window.onload = showPencilIcon;