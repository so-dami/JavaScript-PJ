// main.js

console.log("main js 호출");

// 메인 배경 효과
// 대상: .lbg, .rbg
const lbg = document.querySelector(".lbg");
const rbg = document.querySelector(".rbg");

// 왼쪽
lbg.addEventListener("mouseenter", function () {
    this.classList.add("on");
    rbg.classList.remove("on");
});

// 오른쪽
rbg.addEventListener("mouseenter", function () {
    this.classList.add("on");
    lbg.classList.remove("on");
});

// 햄버거 버튼
// 대상: .ham, .mlist
const ham = document.querySelector(".ham");
const mlist = document.querySelector(".mlist");

ham.addEventListener("click", function () {
    this.classList.toggle("on");
    mlist.classList.toggle("on");
});
