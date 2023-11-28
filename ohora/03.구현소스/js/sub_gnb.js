// sub_gnb.js

console.log("gnb js 호출");

// 대상: .pgnb li, .indic li
const pgnb = document.querySelector(".pgnb li");
const 짜슥 = document.querySelectorAll(".indic li");

짜슥.forEach(헐=>{
    헐.addEventListener("click",function(이벤){
        이벤.preventDefault();
    짜슥.forEach(헐=>헐.classList.remove("on"));
    this.classList.add("on");
})

});


