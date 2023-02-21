var input = document.querySelector("#taskinput")
var addbtn = document.querySelector("#buttoninput")
var DivTasks = document.querySelector(".AllTasks")

let TasksArray = [];

//for stable when reload
if(localStorage.getItem('tasks')){
    TasksArray = JSON.parse(localStorage.getItem('tasks'))
}

//Trigger function of data
 GetDatafromlocalstorage()

//Check For Input
addbtn.addEventListener("click", function(){
    if(input.value !== "")
    {
        AddTaskToArray(input.value);
        input.value = "";
    }
    else
    {
        alert("No Task to be added")
    }
})

function AddTaskToArray(taskinput){
    const task ={
        id: Date.now(),
        Title: taskinput,
        completed: false
    };
    TasksArray.push(task);
    AddTasksToDiv(TasksArray);
    AddtoLocalStorage(TasksArray)
}

//Add All Tasks to HTML Page
function AddTasksToDiv(TasksArray){
    DivTasks.innerHTML = "";
    TasksArray.forEach(task => {
        DivTasks.style.overflowY = "scroll";

        let div = document.createElement("row");
        div.style.border = '1px solid transparent'

        let inner_div = document.createElement("row");
        inner_div.classList.add('container','shadow', 'rounded-4', 'd-flex', 'justify-contenty-center', 'p-2')
        inner_div.style.background = 'rgb(210, 224, 248'
        inner_div.setAttribute('task_id', task.id)

        let P_div = document.createElement('P')
        P_div.classList.add('fs-5', 'col-md-10', 'mb-1', 'mb-md-0')

        textnode = document.createTextNode(task.Title)
        P_div.appendChild(textnode)

        let delete_icon = document.createElement('i');
        delete_icon.classList.add('bi','bi-trash', )
        delete_icon.style.color = 'red'
        delete_icon.style.fontSize = '22px'
        delete_icon.dataset.accessId = 'Delete'
        delete_icon.setAttribute('role', 'button');

        let done_icon = document.createElement('i');
        done_icon.classList.add('bi', 'bi-check2-square', 'col-md-1')
        done_icon.style.color = 'green'
        done_icon.style.fontSize = '22px'
        done_icon.dataset.accessId = 'Done'
        done_icon.setAttribute('role', 'button');

        inner_div.append(P_div, done_icon, delete_icon)
        div.appendChild(inner_div)
        DivTasks.appendChild(div)

        if(task.completed){
            div.classList.add('text-decoration-line-through')
            div.classList.add('opacity-50')
        }
    });
}
DivTasks.addEventListener('click', function(e){
    if(e.target.dataset.accessId == "Delete"){
        //remove from localstorage
        deletefromlocalstorage(e.target.parentElement.getAttribute("task_id"))
        //remove from html page
        e.target.parentElement.parentElement.remove()
    }
    if(e.target.dataset.accessId == "Done"){
        var parent_task = e.target.parentElement;
        //update state in localstorage
        updateLocalStorage(parent_task.getAttribute("task_id"));
        //update state in html page
        parent_task.classList.toggle('opacity-50');
        parent_task.classList.toggle('text-decoration-line-through')
    }
})

function AddtoLocalStorage(TasksArray){
    window.localStorage.setItem("tasks", JSON.stringify(TasksArray))
}

//Get Datat from LocalSotrage
function GetDatafromlocalstorage(){
    let data = localStorage.getItem("tasks");
    if(data){
        //convert data from string to objects
        tasks = JSON.parse(data)
        AddTasksToDiv(tasks)
    }
}
function deletefromlocalstorage(taskId){
    //filter array to get array without deleted task
    TasksArray = TasksArray.filter((task)=> task.id != taskId)
    AddtoLocalStorage(TasksArray)
}
function updateLocalStorage(taskId){
    for(var i=0; i<TasksArray.length; i++){
        if(TasksArray[i].id == taskId){
            TasksArray[i].completed == false 
            ? ( TasksArray[i].completed = true) 
            : (TasksArray[i].completed = false)
        }
    }
    AddtoLocalStorage(TasksArray);
}
function Clear(){
    DivTasks.innerHTML = "";
    window.localStorage.removeItem("tasks");
    TasksArray=[];
    AddtoLocalStorage(TasksArray);
}