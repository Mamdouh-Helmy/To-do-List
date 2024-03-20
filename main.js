// let text2 = document.querySelector('.text');
// let btn = document.getElementById('btn');
// let input = document.getElementById('input');
// let all = document.getElementById('all');

// window.addEventListener('load', function() {
//     let storedItems = JSON.parse(localStorage.getItem('items')) || [];
//     storedItems.forEach(function(itemText) {
//         addItem(itemText);
//     });
// });

// btn.addEventListener('click', function(ele) {
//     ele.preventDefault();
//     if (input.value !== "") {
//         addItem(input.value);
//         saveToLocalStorage(input.value);
//         input.value = '';
//     }
// });

// function addItem(text) {
//     let divUp = document.createElement('div');
//     divUp.className = 'box';
//     let h3 = document.createElement('h3');
//     h3.textContent = text;

//     let span = document.createElement('span');
//     span.textContent = 'remove';
//     span.className = 'remove';

//     divUp.appendChild(h3);
//     divUp.appendChild(span);
//     text2.appendChild(divUp);

//     span.addEventListener('click', function() {
//         divUp.remove();
//         removeFromLocalStorage(text);
//     });

//     all.addEventListener('click' , () => {
//         divUp.remove();
//         localStorage.clear();
//     });
// }

// function saveToLocalStorage(text) {
//     let storedItems = JSON.parse(localStorage.getItem('items')) || [];
//     storedItems.push(text);
//     localStorage.setItem('items', JSON.stringify(storedItems));
// }

// function removeFromLocalStorage(text) {
//     let storedItems = JSON.parse(localStorage.getItem('items')) || [];
//     let index = storedItems.indexOf(text);
//     if (index > -1) {
//         storedItems.splice(index, 1);
//         localStorage.setItem('items', JSON.stringify(storedItems));
//     }
// }


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