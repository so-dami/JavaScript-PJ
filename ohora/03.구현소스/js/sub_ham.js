// 햄버거 버튼
// 대상: .ham, .mlist
const ham = document.querySelector(".ham");
const mlist = document.querySelector(".mlist");

ham.addEventListener("click", function () {
    this.classList.toggle("on");
    mlist.classList.toggle("on");
});
