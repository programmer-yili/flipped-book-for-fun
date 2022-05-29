


const book = document.getElementById("book-container")

// Todo: 修改最后上一页 覆盖问题
const buildFlippedBookElements = () => {
    const childrenElements = book.children;
    let paperNum = 1;
    let bookContent = ''

    for (let i = 0; i < childrenElements.length; i+=2) {
        childrenElements[i+1].style.transform = 'rotateY(180deg)'
        bookContent  += `

            <div id="p-${paperNum}" class="paper" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;perspective: 1500px;z-index: -${paperNum}">
                <div class="front" 
                style="    background-color: #fff;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2em;
                font-weight: bold;
                transform-origin: left;
                transition: transform 0.5s;
                backface-visibility: hidden;
                border-left: #1e1e1e 4px solid;
                z-index: 1;
                ">
                    ${childrenElements[i].outerHTML}
                </div>
                <div class="back" style="    background-color: #fff;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2em;
                font-weight: bold;
                transform-origin: left;
                transition: transform 0.5s;">
                    ${childrenElements[i+1].outerHTML}
                </div>
            </div>
        `;
        paperNum++;
    }
    const style = document.createElement('style')
    style.innerHTML = `
    
.flipped .front, .flipped .back {
    transform: rotateY(-180deg);
}

    `
    document.head.append(style)
    book.style.position = 'relative'
    book.style.transition = 'transform 0.5s'
    book.innerHTML = bookContent
}


buildFlippedBookElements()


const nextBtn = document.querySelector("#next-btn")
const prevBtn = document.querySelector("#prev-btn")

nextBtn.addEventListener("click", goNextPage)

prevBtn.addEventListener('click', goPrevPage)


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


let currentLocation = 1;
const paperNums = book.children.length
let maxLocation = paperNums + 1

function goNextPage() {

    console.log(currentLocation)
    if(currentLocation >= maxLocation) {
        return;
    }

    if(currentLocation === 1) {
        openBook()
    }

    const curerntPaperElement = book.children[currentLocation - 1]
    curerntPaperElement.classList.add('flipped')
    curerntPaperElement.style.zIndex = currentLocation - 1

    if((maxLocation -1) === currentLocation) {
        closeBook()
    }

    currentLocation++

}

function goPrevPage() {
    if(currentLocation <= 1 ) {
        return;
    }

    console.log(maxLocation)
    if((currentLocation -1) === maxLocation) {
        openBook()
    }
    const curerntPaperElement = book.children[currentLocation -2]

    curerntPaperElement.classList.remove('flipped')

    curerntPaperElement.style.zIndex = maxLocation - currentLocation

    if(currentLocation === 2) {
        closeBook(true)
    }
    currentLocation --;
}
