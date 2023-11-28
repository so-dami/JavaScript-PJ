// pedi.js //

import items from "./pedi_data.js";

console.log("pedi js 호출");

const qs = x=> document.querySelector(x);
const qsa = x=> document.querySelectorAll(x);
const cg = x=> console.log(x);

// cg(items)

/// 상품코드 생성하기 함수 //////
function makeList(seq){ // seq 리스트 순번
    // 대상선정: .plist
    // 변경내용: 하위요소로 ul>li 상품코드 넣기
    const plist = qs(".plist");
    // cg(plist);
    
    // 대상에 코드넣기
    // 코드변수
    let hcode = "<ul>";
    // items객체값 셋팅하기
    for(let x in items[seq]){
        // cg(x);
        hcode += retHcode(items[seq][x].상품이미지,items[seq][x].상품명,items[seq][x].상품가격);    
    }
    
    hcode += "</ul>"
    
    // cg(hcode);
    
    // 생성코드 넣기
    plist.innerHTML=hcode;

    // 이벤트 등록하기
    plist.querySelectorAll(".img").forEach(ele=>{
        ele.onmouseover=function(){
            // cg(this.style.backgroundImage.replace(".jpg","_pho.jpg"));
            let tg = this.style.backgroundImage.replace(".jpg","_pho.jpg");
            this.style.backgroundImage = tg;
            // cg(tg);
        }
        ele.onmouseout=function(){
            // cg(this.style.backgroundImage.replace("_pho.jpg",".jpg"));
            let tg = this.style.backgroundImage.replace("_pho.jpg",".jpg");
            this.style.backgroundImage = tg;
            // cg(tg);
        }
    })

} ////////// makeList함수 ///////////////

makeList(0); // 호출!



// 반복코드 리턴함수 : pm1-상품이미지,pm2-상품명,pm3-상품가격
function retHcode (pm1,pm2,pm3){
    return `
    <li>
        <div class="product">
            <!-- 상품 이미지 -->
            <div class="img" style="background-image:url(../img/${pm1}.jpg)"></div>
            <!-- 상품 정보 -->
            <div class="pinfo">
                <h3 class="name">${pm2}</h3>
                <div class="pcont">
                    <div class="icon">
                        <div class="cart">
                            <img src="../img/cart.png" alt="장바구니">
                        </div>
                        <div class="like">
                            <img src="../img/like.png" alt="찜">
                        </div>
                    </div>
                    <div class="price">${pm3}</div>
                </div>
            </div>
        </div>
    </li>
    `;

} ////////// retHcode 함수 ///////////



// 리스트 버튼 클릭시 리스트 변경하기
// 대상: .indic a
const indic = qsa(".indic a");
// cg(indic);

indic.forEach((ele,idx)=>{
    ele.onclick=()=>{
        makeList(idx);
    }
})



