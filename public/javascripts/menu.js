window.addEventListener("scroll", function(){
    let header = document.querySelector('.header')
    header.classList.toggle('rolagem', window.scrollY > 900)
})

var btn = document.querySelector(".btn-baixe");

btn.onmousemove = function(e){
    var x = e.pageX - btn.offsetLeft;
    var y = e.pageY - btn.offsetTop;

    btn.style.setProperty('--eixoX', x + 'px')
    btn.style.setProperty('--eixoY', y + 'px')

}