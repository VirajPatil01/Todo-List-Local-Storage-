
let taskList = []

let day = document.getElementById('exampleFormControlInput2')


let dateTime = document.getElementById('exampleFormControlInput1')


let taskHeading = document.getElementById('exampleFormControlInput3')

let taskDescription = document.getElementById('exampleFormControlTextarea1')

let clipBoard = document.getElementById('task-list')

let clipBtn = document.getElementById('Clip-button')

let creatTask = document.getElementById('create-task')


function createTask(e) {
  e.preventDefault()
  let day = document.getElementById('exampleFormControlInput2').value

  let dateTime = document.getElementById('exampleFormControlInput1').value

  let taskHeading = document.getElementById('exampleFormControlInput3').value

  let taskDescription = document.getElementById('exampleFormControlTextarea1').value

  const task = {
    heading: taskHeading,
    description: taskDescription,
    day: day,
    timeanddate: dateTime,
    id: Date.now().toString(),
    done: false
  }

  day = document.getElementById('exampleFormControlInput2').value = ""
  dateTime = document.getElementById('exampleFormControlInput1').value = ""
  taskHeading = document.getElementById('exampleFormControlInput3').value = ""
  taskDescription = document.getElementById('exampleFormControlTextarea1').value = ""


  addTask(task)
}

function addTask(task) {
  if (task) {
    taskList.push(task)
    renderList()
    showNotification('Task add successfully!!')
    return;
  }
}

function deleteTask(taskId) {
  let newTask = taskList.filter(function(task) {
    return task.id !== taskId
  })

  taskList = newTask
  renderList()
  alert('Task deleted successfully!!')

}

function addTaskToDOM(task) {
  const span = document.createElement('span')

  span.innerHTML = `
    <div class="card text-center">
  <div class="card-header">
    ${task.day}&nbsp &nbsp${task.timeanddate}
  </div>
  <div class="card-body" id="card-body">
    <h5 class="card-title">
    <input type='checkbox'${task.done ? 'checked' : ''} id='${task.id}' class='custom-checkbox'>
    <lable for= "${task.id}">${task.heading}</lable>
    </h5>
    <p class="card-text">${task.description}</p>
    <img src="https://cdn-icons-png.flaticon.com/512/71/71732.png" data-id= "${task.id}" height="30" class="delete">
    `
  taskboard.append(span)
}
function renderList() {
  taskboard.innerHTML = ''
  for (let i = 0; i < taskList.length; i++) {
    addTaskToDOM(taskList[i])

  }
  taskNumber.innerHTML = taskList.length
}

function markTaskComplete(taskId) {
  let task = taskList.filter(function(task) {
    return task.id === taskId
  })

  if (task.length > 0) {
    const currentTask = task[0]
    currentTask.done = !currentTask.done
    renderList()
    alert("Hurry task is completed!!! You got this task: " + currentTask.heading)

    return
  }
}

function showNotification(text) {
  const notify = document.getElementById('notificationPopup')
  notify.innerHTML = text
}



function handleClickEvent(e) {
  const target = e.target
  if (target.className == "delete") {
    const taskId = target.dataset.id
    deleteTask(taskId)
    return;
  }

  else if (target.className == 'custom-checkbox') {
    const taskId = target.id
    markTaskComplete(taskId)

    return;
  }
}

clipBtn.addEventListener('click', createTask)
document.addEventListener('click', handleClickEvent)

creatTask.addEventListener('click', function() {
  document.getElementById('Task-form').style.display = 'inline'

})