//-------------------------위치 스크롤-------------------------//
document.querySelector('.nav-container').addEventListener('click', e => {
    if (e.target.nodeName === 'LI') {
        let id_value = e.target.dataset.link;
        document.querySelector(id_value).scrollIntoView({ behavior: 'smooth' });
    }
});








//-------------------------이전 버튼-------------------------//
function transformPrev(event) {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling; //그 다음 요소가 넥스트버튼임
    
    const classList = slidePrev.parentElement.previousElementSibling.firstElementChild; //부모-이전-자식요소가 ul태그
    let activeLi = classList.getAttribute('data-position'); //해당태그의 데이터포지션값을 가져옴 
    const liList = classList.getElementsByTagName('li'); //li들을 가져옴

    //classList.clientWidth: ul 태그의 너비 (즉 카드가 보여지는)
    //카드 하나가 240px, 마진이 양쪽 10px이므로 도합 260으로 계산
    //전체 카드의 길이 liList.length * 260 에서 260 은 각 li 요소의 실질 너비(margin 포함)
    // activeLi 는 data-position 에 있는 현재 위치 
    // 즉, liList.length * 260 + Number(activeLi) 는 현재 위치부터 오른쪽으로 나열되야 하는 나머지 카드들의 너비
    if (classList.clientWidth < (liList.length * 260 + Number(activeLi))) { //ul태그의 너비보다 (전체카드길이 +- 카드위치) 가 크다면
        activeLi = Number(activeLi) - 260;         // 위치를 왼쪽으로 260 이동

        if (classList.clientWidth >= (liList.length * 260 + Number(activeLi))) { //이동 후 ul태그의 너비가 (전체카드길이 +- 카드위치) 보다 크다면 이전버튼 비활성화
            slidePrev.style.color = '#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', transformPrev);
        }

        slideNext.style.color = '#2f3059'; //좌측으로 이동후엔 무조건 우측으로 갈 수 있으니, 우측버튼 활성화
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', transformNext);
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}



//-------------------------다음 버튼-------------------------//
function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;
    const classList = slidePrev.parentElement.previousElementSibling.firstElementChild;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');


    if (Number(activeLi) < 0) {         // 초기보다 좌측으로 이동된 상태라면 
        activeLi = Number(activeLi) + 260;

        slidePrev.style.color = '#2f3059'; //우측으로 이동후엔 무조건 우측으로 갈 수 있으니, 좌측버튼 활성화
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);

        if (Number(activeLi) >= 0) {  // 맨 왼쪽에 현재 보이는 카드가, 맨 첫번째 카드라면, 오른쪽 즉, NEXT 로 갈 수 없으므로 NEXT 버튼 비활성화
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);
        }
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}



/*----------------------------------------------------------------------*/
const slidePrevList = document.getElementsByClassName('slide-prev');

let classList = slidePrevList[0].parentElement.previousElementSibling.firstElementChild;     // ul 태그 선택하기: 부모-이전-자식
let liList = classList.getElementsByTagName('li');      //li들을 저장

if (classList.clientWidth < (liList.length * 260)) {    //카드가 ul태그의 너비를 넘친다면, 
    slidePrevList[0].classList.add('slide-prev-hover'); //왼쪽 버튼을 활성화
    slidePrevList[0].addEventListener('click', transformPrev);
}