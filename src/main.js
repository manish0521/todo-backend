window.onload = init;



function init() {
    getTodos()
    // document.querySelector('#get').addEventListener('click', getTodos);
    document.querySelector('#post').addEventListener('click', postTodo);
    document.querySelector('#put').addEventListener('click', updateThirdTodo);
}

function getTodos(event) {
    // event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/todos');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleData;
    xhr.send();
}

function postTodo(event) {
    event.preventDefault();
    // alert ("alert!");
    const userInput = document.querySelector('#user-input').value;
    if(userInput !== "") {
        const newTodo = {
            text: userInput,
            completed: false
        };
        const jsonnedTodo = JSON.stringify(newTodo);
        
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/todos');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = getTodos;
        xhr.send(jsonnedTodo);
        
        document.querySelector('#user-input').value = '';

    }
}





function updateThirdTodo(event) {
    const updatedTodo = {
        text: '????',
        completed: true
    };
    const jsonnedTodo = JSON.stringify(updatedTodo);
    
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:3000/todos/3');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = handleData;
    xhr.send(jsonnedTodo);
}

function handleData(event) {
   const todoData = JSON.parse(event.target.responseText);
//    call clear funtion here
 clear();

   for(i = 0; i < todoData.length; i++){
    showMe = todoData[i].text;
    
    
    const newLi = document.createElement('li');
    newLi.innerText = showMe;


    const newlist = document.querySelector('#todo-list');
    newlist.appendChild(newLi);

   }
}

function clear(){
    const newlist = document.querySelector('#todo-list');

    while(newlist.hasChildNodes()) {
        newlist.removeChild(newlist.firstChild);
    }
} 