document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector("#nav").style.left ='0';
    document.querySelector("#exit").style.display = "block";
});

document.querySelector("#exit").addEventListener("click", () =>{
    document.querySelector("#nav").style.left ='-100%';
    document.querySelector("#exit").style.display ="none";
})

var prevScrollpos = window.pageYOffset;
window.onscroll = () => {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav").style.left = "-100%";
    document.getElementById("navBar").style.top = "0";
  } else {
    document.getElementById("nav").style.left = "-100%";
    document.getElementById("nav").style.top = "0";
    document.getElementById("navBar").style.top = "-6rem";
  }
  prevScrollpos = currentScrollPos;
}

let modal = document.getElementById("nav");

window.onclick = function(event) {
    if (event.target == modal) {
        document.getElementById("exit").style.display = "none";
        modal.style.left = "-100%";
    }
  }






