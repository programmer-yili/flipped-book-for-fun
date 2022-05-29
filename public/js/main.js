const nextBtn = document.querySelector("#next-btn")
const prevBtn = document.querySelector("#prev-btn")
const paper1 = document.querySelector("#p1")
const paper2 = document.querySelector("#p2")
const paper3 = document.querySelector("#p3")
const book = document.querySelector("#book")

nextBtn.addEventListener("click", goNextPage)
prevBtn.addEventListener("click", goPrevPage)


let currentLocation = 1
const paperNums = 3
let maxLocation = paperNums + 1


function openBook () {
    book.style.transform = 'translateX(50%)'
    nextBtn.style.transform = 'translateX(90px)'
    prevBtn.style.transform = 'translateX(-90px)'
}

function closeBook(isFirstPaper) {
    if(isFirstPaper) {
        book.style.transform = 'translateX(0)'
    } else {
        book.style.transform = 'translateX(100%)'
    }
    nextBtn.style.transform = 'translateX(0)'
    prevBtn.style.transform = 'translateX(0)'
}

// 下一页
function goNextPage() {
    if (currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1: openBook();paper1.classList.add("flipped");
            paper1.style.zIndex = 1;
            break;
            case 2: paper2.classList.add("flipped");
            paper2.style.zIndex = 2;break;
            case 3: paper3.classList.add("flipped");
            paper3.style.zIndex = 3;closeBook();break;
            default: throw new Error("内部错误")
        }
        currentLocation++
    }
}

// 上一页
function goPrevPage() {
    if (currentLocation > 1) {
        switch(currentLocation) {
            case 4: openBook(true);paper3.classList.remove("flipped");
            paper3.style.zIndex = 1;
            break;
            case 3: paper2.classList.remove("flipped");
            paper2.style.zIndex = 2;break;
            case 2: paper1.classList.remove("flipped");
            paper1.style.zIndex = 3;closeBook(true);break;
            default: throw new Error("内部错误")
        }
        currentLocation--
    }
}

