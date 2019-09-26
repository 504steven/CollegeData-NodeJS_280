
window.onload = function(){
    window.setInterval("changeImg()",1200);
}
var i = 1;
function changeImg(){
    i++;
    if(i > 3){
        i=1;
    }
    var img1 = document.getElementById("changeImg");
    img1.src="/img/"+i+".jpg";
}