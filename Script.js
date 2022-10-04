
let input = document.getElementById('text');
let url = document.getElementById('url').value;
let tasksDiv = document.querySelector(".tasks");
let submit = document.getElementById('add');
let form = document.getElementById('form');

//-Empty-Array To Store The-Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();


// Add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
};

// Click-On Task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
      // Remove Task From Local Storage
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      // Remove Element From Page
      e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
      // Toggle Completed For The Task
      toggleStatusTaskwith(e.target.getAttribute("data-id"));
      // Toggle Done Class
      e.target.classList.toggle("done");
    }
  });


function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add tsks to local storage
    addDataToLocalStorageFrom(arrayOfTasks);
}


function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // create main div
        let div = document.createElement("div");
        div.className = "task";
        // check if task is done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));

      
        // Append Button to main 
        div.appendChild(span);

        // add task div to Tasks container 
        tasksDiv.appendChild(div);

    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
  }


function toggleStatusTaskwith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ?( arrayOfTasks[i].completed = true) :( arrayOfTasks[i].completed = false )

        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}



