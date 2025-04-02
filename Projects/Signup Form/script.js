const container = document.querySelector(".container");
const signUpBtn = document. querySelector(".left_box button");

signUpBtn.addEventListener("click", ()=> {
    container.classList.toggle("change");
});