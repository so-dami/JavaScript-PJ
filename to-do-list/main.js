// 오늘의 할 일에 새로 입력된 값을 넣을 변수
let newTodo = '';

// 오늘의 할 일 input 값
let todoTxt = document.querySelector('#input-txt');

// + 버튼
let plusBtn = document.querySelector('.plus-btn');

let ul = document.querySelector('.list-wrap > ul');

// 공백 체크 모달창
let blankChk = document.querySelector('#blank-chk');

// 공백 체크 모달창 닫기 버튼
let closeBtn = document.querySelector('#close-btn');

// liList
let liList;

// count
let i;
if (localStorage.getItem('idx') == null) {
  i = 0;
  localStorage.setItem('idx', i);
} else {
  i = localStorage.getItem('idx');
}

// 새로고침 후에도 데이터, checked 유지 시키기
if (localStorage.getItem('todo') !== null) {
  let todoGet = JSON.parse(localStorage.getItem('todo'));

  for (let i = 0; i < todoGet.length; i++) {
    let hcode = `
      <li class="list-item flex">
        <div class="chk-box">
          <input type="checkbox" name="check${todoGet[i]['id']}" id="check${todoGet[i]['id']}" value="${
      todoGet[i]['txt']
    }" ${todoGet[i]['checked'] == true ? 'checked' : ''} onchange="chgChecked(this)" />
          <label class="chk-label" for="check${todoGet[i]['id']}">${todoGet[i]['txt']}</label>
        </div>
        <div class="del-box">
          <button class="del-btn" type="button" onClick="listDelete(this)">
            <div></div>
          </button>
        </div>
      </li>
    `;
    ul.innerHTML += hcode;
  } // for //
  liList = document.querySelectorAll('input[type="checkbox"]');
} // if //

// plus button 클릭 시 - li 추가
plusBtn.addEventListener('click', function () {
  // 공백 체크 - input 값이 공백일 때
  if (todoTxt.value == '') {
    blankChk.classList.add('show-modal');
  } // if //

  // 공백 체크 - input 값이 공백이 아닐 때
  else {
    let todoLocal;
    let localGet = JSON.parse(localStorage.getItem('todo'));

    i++;
    localStorage.setItem('idx', i);

    // 오늘의 할 일 input 값 변수에 넣기
    newTodo = { txt: todoTxt.value, checked: false, id: i };

    // localStorage 추가
    if (localStorage.getItem('todo') == null) {
      todoLocal = [];
      todoLocal.push(newTodo);
      localStorage.setItem('todo', JSON.stringify(todoLocal));
    } else {
      localGet.push(newTodo);
      localStorage.setItem('todo', JSON.stringify(localGet));
    } // else //

    // li 추가
    let li = `
      <li class="list-item flex">
        <div class="chk-box">
          <input type="checkbox" name="check${i}" id="check${i}" value="${newTodo['txt']}" onchange="chgChecked(this)" />
          <label class="chk-label" for="check${i}">${newTodo['txt']}</label>
        </div>
        <div class="del-box">
          <button class="del-btn" type="button" onClick="listDelete(this)">
            <div></div>
          </button>
        </div>
      </li>
    `;

    ul.innerHTML += li;
    todoTxt.value = '';
  } // else //
  liList = document.querySelectorAll('input[type="checkbox"]');
  console.log(liList);
}); // plus-btn click //

function chgChecked(e) {
  console.log('change', e.id, e.checked);

  // e의 checked 값
  let isChecked = e.checked;

  // localStorage에서 데이터 가져오기
  let getItem = JSON.parse(localStorage.getItem('todo'));

  // e.id에서 문자 지우기
  let splitCheck = e.id.split('check')[1];
  console.log(splitCheck);

  // e의 checked가 true면?
  if (isChecked) {
    // splitCheck와 'todo'의 id와 일치하는 데이터 찾아서 checked 값 변경하기
    getItem.forEach((a) => {
      if (a['id'] == splitCheck) {
        a['checked'] = true;
        localStorage.setItem('todo', JSON.stringify(getItem));
      }
    }); // forEach //
  } else {
    getItem.forEach((a) => {
      if (a['id'] == splitCheck) {
        a['checked'] = false;
        localStorage.setItem('todo', JSON.stringify(getItem));
      }
    }); // forEach //
  } // else //
} // chgChecked //

// 닫기 버튼 클릭 시 - 모달창 닫기
closeBtn.addEventListener('click', function () {
  blankChk.classList.remove('show-modal');
});

// 검정 배경 클릭 시 - 모달창 닫기
blankChk.addEventListener('click', function () {
  blankChk.classList.remove('show-modal');
});

// 삭제
function listDelete(e) {
  let deleteBtn = e;

  // 삭제 여부 묻는 모달창
  let delChk = document.querySelector('#del-chk');

  // 삭제 여부 모달창 열기
  delChk.classList.add('show-modal');

  // '예' 버튼
  let yesBtn = document.querySelector('#yes-btn');

  // '아니오' 버튼
  let noBtn = document.querySelector('#no-btn');

  // '예' 클릭 시
  yesBtn.addEventListener('click', function () {
    // 삭제 여부 모달창 닫기
    delChk.classList.remove('show-modal');

    // 해당 삭제 버튼 상단의 li 찾기
    let delLi = deleteBtn.parentElement.parentElement;

    // 삭제할 input 찾기
    let delInput = delLi.querySelector('input[type="checkbox"]');

    // 값: check숫자
    let id = delInput.id.split('check')[1];

    // li 삭제하기
    delLi.remove();

    // localStorage 데이터 삭제
    let delLocal = JSON.parse(localStorage.getItem('todo'));

    let result = delLocal.filter((value) => {
      return value['id'] != id;
    });

    localStorage.setItem('todo', JSON.stringify(result));
  });

  // '아니오' 클릭 시
  noBtn.addEventListener('click', function () {
    // 모달창 닫기
    delChk.classList.remove('show-modal');
  });

  // 검정 배경 클릭 시
  delChk.addEventListener('click', function () {
    // 모달창 닫기
    delChk.classList.remove('show-modal');
  });
}
