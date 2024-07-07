let btn = document.getElementById('btn');
let input = document.getElementById('input');
let all = document.getElementById('all');
let textDivUp = document.querySelector('.text');

window.onload = function () {
    let items = JSON.parse(localStorage.getItem('item')) || [];
    items.forEach((ele) => {
        addText(ele.text, ele.checked);
    });
};

btn.addEventListener('click', function() {
    let textArray = JSON.parse(localStorage.getItem('item')) || [];
    let inputValue = input.value;

    if (inputValue !== '' && !textArray.some(item => item.text === inputValue)) {
        addText(inputValue, false);
        saveToLocalstorage(inputValue, false);
        input.value = '';
    }
});

function addText(text, checked) {
    let divUp = document.createElement('div');
    divUp.className = 'box';

    let h3 = document.createElement('h3');
    h3.textContent = text;
    h3.className = 'text-content';

    let divcontainer = document.createElement('div');
    divcontainer.className = 'box-container';
    let editDiv = document.createElement('div');
    editDiv.textContent = "Edit";
    editDiv.className = 'edit';
    let finish = document.createElement('div');
    finish.textContent = "Finish";
    finish.className = 'finish';

    divcontainer.appendChild(editDiv);
    divcontainer.appendChild(finish);

    let span = document.createElement('span');
    span.textContent = 'remove';
    span.className = 'remove';

    divUp.appendChild(h3);
    divUp.appendChild(divcontainer);
    divUp.appendChild(span);
    textDivUp.appendChild(divUp);

    if (checked) {
        divUp.classList.add("check");
        finish.textContent = "Not Finished";
        finish.classList.add('checkTrue')
        toggleSpanDisplay(divUp, true);
    }

    span.addEventListener('click', function () {
        remover(h3.textContent);
        divUp.remove();
    });

    all.addEventListener('click', function () {
        textDivUp.innerHTML = '';
        localStorage.clear();
    });

    finish.addEventListener('click', function () {
        divUp.classList.toggle("check");
        let newCheckedState = divUp.classList.contains("check");
        if(newCheckedState){
            finish.textContent = 'Not Finished';
            finish.classList.add('checkTrue')
            toggleSpanDisplay(divUp, newCheckedState);
            updateCheckedState(h3.textContent, newCheckedState);
        }else{
            finish.textContent = "Finish";
            finish.classList.remove('checkTrue')
            toggleSpanDisplay(divUp, newCheckedState);
            updateCheckedState(h3.textContent, newCheckedState);
        }
        
        
    });

    editDiv.addEventListener('click', function () {
        let newValue = prompt("Edit the task:", h3.textContent);
        if (newValue !== null && newValue !== '') {
            let oldValue = h3.textContent;
            h3.textContent = newValue;
            updateLocalStorage(oldValue, newValue);
        }
    });
}

function toggleSpanDisplay(divUp, checked) {
    let span = divUp.querySelector('.remove');
    let editDiv = divUp.querySelector('.edit');
    if (checked) {
        span.style.display = 'none';
        editDiv.style.display = 'none';
    } else {
        span.style.display = 'block';
        editDiv.style.display = 'block';
    }
}

function saveToLocalstorage(text, checked) {
    let items = JSON.parse(localStorage.getItem("item")) || [];
    items.push({ text: text, checked: checked });
    localStorage.setItem('item', JSON.stringify(items));
}

function remover(text) {
    let storedItems = JSON.parse(localStorage.getItem('item')) || [];
    let index = storedItems.findIndex(item => item.text === text);

    if (index > -1) {
        storedItems.splice(index, 1);
        localStorage.setItem('item', JSON.stringify(storedItems));
    }
}

function updateLocalStorage(oldText, newText) {
    let storedItems = JSON.parse(localStorage.getItem('item')) || [];
    let index = storedItems.findIndex(item => item.text === oldText);

    if (index > -1) {
        storedItems[index].text = newText;
        localStorage.setItem('item', JSON.stringify(storedItems));
    }
}

function updateCheckedState(text, checked) {
    let storedItems = JSON.parse(localStorage.getItem('item')) || [];
    let index = storedItems.findIndex(item => item.text === text);

    if (index > -1) {
        storedItems[index].checked = checked;
        localStorage.setItem('item', JSON.stringify(storedItems));
    }
}
