// for login & registration section
let register = document.querySelector(".register");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let loginBox = document.querySelector(".login-box");
let signupBox = document.querySelector(".signup-box");

 
register.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
     
    loginBox.style.visibility = "hidden";
    signupBox.style.visibility = "visible";
;
});
 
login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
    
    signupBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible";
});