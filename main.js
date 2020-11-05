let $todoInput; // The place where the user enters the content of the task
let $addBtn; //Button for adding tasks
let $alertInfo // The place where the error is shown
let $newTask // New li added to the list of ul
let $ulList // ul list with tash
let $idToDo=0; //Id to do
let $allTasks; //all to do
let $popup; // popup 
let $popupInput; // input in popup edit
let $editedTodo; //edit Todo
let $cancelBtn; //close popup btn
let $changeToDoBtn; //change old to do/ popup btn
let $popupInfo; // popup info (warining)

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

// all variables

const prepareDOMElements = () => {
  $todoInput=document.querySelector('.todoInput');
  $addBtn=document.querySelector('.addBtn');
  $ulList=document.querySelector('ul');
  $alertInfo=document.querySelector('.alertInfo');
  $allTasks=$ulList.getElementsByTagName('li');
  $popup=document.querySelector('.popup');
  $popupInput=document.querySelector('.popupInput');
  $cancelBtn=document.querySelector('.cancel');
  $popupInfo=document.querySelector('.popupInfo');
  $changeToDoBtn=document.querySelector('.accept');


};

// liseners

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $cancelBtn.addEventListener('click', closePopup);
    $changeToDoBtn.addEventListener('click', changeTask);
    $todoInput.addEventListener('keyup', enterCheck);
};

// adding new task, id is needed to capture the clicked to do

const addNewTask=()=>
{
    if($todoInput.value!=='') {
        $idToDo++;
        $newTask=document.createElement('li');
        $newTask.innerText=$todoInput.value
        $newTask.setAttribute('id',`number-${$idToDo}`);
        $ulList.appendChild($newTask);
        $todoInput.value='';
        $alertInfo.innerText='';
        createElementsToNewTask();
    }
    else {
        $alertInfo.innerText="Wpisz treść zadania!";
    } 
}
// Adding icons and editing to a new task
const createElementsToNewTask = () =>
{
    const toolsPanel=document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn=document.createElement('button')
    completeBtn.classList.add('complete');
    completeBtn.innerHTML='<i class="fas fa-check"></i>';

    const editBtn=document.createElement('button') 
    editBtn.classList.add('edit');
    editBtn.innerText='EDIT';

    const deleteBtn=document.createElement('button')
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML='<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
}

// adding using enter

const enterCheck = () =>

    {
        if (event.keyCode === 13) {
            addNewTask();
        }
    }

    // checking which icon the user clicked
const checkClick=e=>
{
    if(e.target.closest('button').classList.contains('complete'))
    {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    }
    else if(e.target.closest('button').classList.contains('edit'))
    {
        editTask(e);
    }
    else if(e.target.closest('button').classList.contains('delete'))
    {
        deleteTask(e);
    }
}

// delete task

const deleteTask = e =>
{
    const deleteTask=e.target.closest('li');
    deleteTask.remove();
    if($allTasks.length===0)
    {
        $alertInfo.innerText='Brak zadań na liście!';
    }
    else
    {
        $alertInfo.innerText='';
    }
}

// edit tsk

const editTask = e =>
{
    const editTask = e.target.closest('li').id;
    $editedTodo=document.getElementById(editTask);
    $popupInput.value=$editedTodo.firstChild.textContent;
    $popup.style.display='flex';  
}

//close popup

const closePopup = () =>
{
    $popup.style.display='none'; 
    $popupInfo.innerText = '';
}

// change task in popup

const changeTask =()=>
{
    if($popupInput.value!=='')
    {
        $editedTodo.firstChild.textContent=$popupInput.value;
        $popupInfo.innerText = '';
        closePopup();
    }
    else
    {
        $popupInfo.innerText = 'Wpisz zadanie!';
    }

}

document.addEventListener('DOMContentLoaded', main);