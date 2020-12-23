/* Variables */
const addButton = document.querySelector('.add-button');
const todoInput = document.getElementById('todo-input')
const todoContainer = document.querySelector('.todo-container');
const checkButton = document.querySelectorAll(".ckeckButton")
const removeButton = document.querySelector(".fa-times")
const filterTodo = document.querySelector('.filter-todo')
/* event listneners */

addButton.addEventListener('click',addToDo);
filterTodo.addEventListener('click',myfunc)

document.body.addEventListener('keyup', function(event){
   if(event.code == "Enter"){
       addButton.click()
   }
})

/* Functions */

function addToDo(){
    event.preventDefault()
    let todoText = todoInput.value;
    if(todoText == ''){
        alert("there is no todo to submit!")
    }else if(checkIfTodoExists(todoText)){
        alert('todo already exists')
    }else{
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        let todoTextDiv = document.createElement('div');
        todoTextDiv.classList.add('todo-text');
        todoTextDiv.innerText = todoText;
        todoDiv.appendChild(todoTextDiv);
        todoContainer.appendChild(todoDiv);
        let controls = document.createElement('div');
        controls.classList.add('controls');
        controls.innerHTML = '<i class="fas fa-check-square"></i> <i class="fas fa-times"></i>';
        todoDiv.appendChild(controls);
        todoInput.value = "";
        todoDiv.addEventListener('click',checkTodo);
    }
    
}

function checkTodo(e){
    if(e.target.classList[1] == 'fa-check-square'){
        if(e.path[2].classList.value.includes('checked')){
            e.path[2].classList.remove('checked');
        }else{
            e.path[2].classList.add('checked');
        }
        
    }else if(e.target.classList[1] == 'fa-times'){
            e.path[2].classList.add('hide')
            setTimeout(() => {
                e.path[3].removeChild(e.path[2])
            }, 600);
            
    }
    
    
}

function myfunc(e){
    let id = ''
    if(e.target.id != ''){
        id = e.target.id
    }
    if(id == 'completed'){
        todoContainer.childNodes.forEach(element => {
            if(element.classList != undefined){
                if(element.classList.value.includes('check')){
                    element.classList.remove('temphide')
                }else{
                    element.classList.add('temphide')
                }
            }
        });
    }else if(id == 'uncompleted'){
        todoContainer.childNodes.forEach(element => {
            if(element.classList != undefined){
                if(element.classList.value.includes('check')){
                    element.classList.add('temphide')
                }else{
                    element.classList.remove('temphide')
                }
            }
        });
    }else if(id == 'all'){
        todoContainer.childNodes.forEach(element => {
            if(element.classList != undefined){
                if(element.classList.value.includes('temphide')){
                    element.classList.remove('temphide')
                }
            }
        });
    }
}

function checkIfTodoExists(todoText){
    let rep = 1
    todoContainer.childNodes.forEach(element => {
        if(element.classList != undefined){
            if(todoText == element.childNodes[0].textContent){
                rep += 1
            }
        }
    })
    return rep > 1
}