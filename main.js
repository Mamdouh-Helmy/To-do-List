let btn = document.getElementById('btn');
let input = document.getElementById('input');
let all = document.getElementById('all');
let textDivUp = document.querySelector('.text');

window.onload = function () {
    let text = JSON.parse(localStorage.getItem('item')) || [];
    text.forEach((ele) => {
        addText(ele)
    })
}

btn.addEventListener('click' , function (ele) {
    ele.preventDefault()
    if(input.value !== ''){
        addText(input.value);
        saveToLocalstorage(input.value)
        input.value = '';
    }
})

function addText(text){
    let divUp = document.createElement('div');
    divUp.className = 'box';

    let h3 = document.createElement('h3');
    h3.textContent = text;

    let span = document.createElement('span');
    span.textContent = 'remove';
    span.className = 'remove';

    divUp.appendChild(h3);
    divUp.appendChild(span);
    textDivUp.appendChild(divUp);

    span.addEventListener('click' , function () {
        divUp.remove();
        remover(text)
    })

    all.addEventListener('click' , function () {
        divUp.remove();
        localStorage.clear()
    })

    let spanDisplayed = true;

    function toggleSpanDisplay() {
        if (spanDisplayed) {
            span.style.display = 'none';
            spanDisplayed = false;
        } else {
            span.style.display = 'block';
            spanDisplayed = true;
        }
    }

    divUp.addEventListener('click' , function () {
        divUp.classList.toggle("check");
        toggleSpanDisplay()
    })
}

function saveToLocalstorage(text){
    let items = JSON.parse(localStorage.getItem("item")) || [];
    items.push(text);
    localStorage.setItem('item' , JSON.stringify(items))
}

function remover(text){
    let stordItems = JSON.parse(localStorage.getItem('item')) || [];
    let index = stordItems.indexOf(text)

    if(index > -1){
        stordItems.splice(index , 1)
        localStorage.setItem('item' , JSON.stringify(stordItems))
    }
}
