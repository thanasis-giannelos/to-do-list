toDos = [];

const deleteCompletedTasksBtn = document.querySelector(".deleteCompletedTasks-btn");

const checkForCheckedTasks = () => {
  for (const task of toDos) {
    if (task.checked) {
      if(!deleteCompletedTasksBtn.classList.contains("display")) {
        deleteCompletedTasksBtn.classList.add("display");
        return;
      }
      return;
    }
  }
  if(deleteCompletedTasksBtn.classList.contains("display")) {
    deleteCompletedTasksBtn.classList.remove("display");
  } 
};

const deleteBtnClickHandler = e => {
  let aStr = e.target.parentNode.textContent;
  aStr = aStr.slice(0, aStr.length-10);
  for (let i=0; i<toDos.length; i++) {
    if (toDos[i].text === aStr) {
      toDos.splice(i, 1);
      break;
    }
  }
  renderToDos();
};

const editBtnClickHandler = e => {
  let aStr = e.target.parentNode.textContent;
  aStr = aStr.slice(0, aStr.length-10);
  for (let i=0; i<toDos.length; i++) {
    if (toDos[i].text === aStr) {
      let newTask = prompt("edit task", toDos[i].text);
      if (newTask.trim().length !== 0) toDos[i].text = newTask;
      break;
    }
  }
  renderToDos();
};

const checkBoxClickHandler = e => {
  e.target.parentNode.classList.toggle("strikethrough");

  let aStr = e.target.parentNode.textContent;
  aStr = aStr.slice(0, aStr.length-10);
  for (let i=0; i<toDos.length; i++) {
    if (toDos[i].text === aStr) {
      toDos[i].checked = !toDos[i].checked;
      break;
    }
  }

  checkForCheckedTasks();
};

const renderToDos = () => {
  const listDiv = document.getElementById("lists-container");

  //every time renderToDos() is called, it clears everything in div.lists-container
  while (listDiv.firstChild) {
    listDiv.removeChild(listDiv.firstChild);
  }

  if (toDos.length === 0 ) {
    const anh2 = document.createElement("h2");
    const textNode = document.createTextNode("No Tasks");
    anh2.appendChild(textNode);
    listDiv.appendChild(anh2);
    return;
  }

  const ul = document.createElement("ul");
  toDos.forEach(toDoItem => {
    const li = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.onclick = checkBoxClickHandler;
    checkBox.type = "checkbox";
    checkBox.id = "checkbox";

    const textNode = document.createTextNode(`${toDoItem.text}`);

    const editTaskBtn = document.createElement("button");
    const editBtnTextNode = document.createTextNode("Edit");
    editTaskBtn.id = "editTask";
    editTaskBtn.onclick = editBtnClickHandler;
    editTaskBtn.appendChild(editBtnTextNode);

    const deleteTaskBtn = document.createElement("button");
    const btnTextNode = document.createTextNode("Delete");
    deleteTaskBtn.id = "deleteTask";
    deleteTaskBtn.onclick = deleteBtnClickHandler;
    deleteTaskBtn.appendChild(btnTextNode);

    li.appendChild(checkBox);
    li.appendChild(textNode);
    li.appendChild(editTaskBtn);
    li.appendChild(deleteTaskBtn);

    listDiv.appendChild(li);
  });
};

const createToDO = enteredTask => {
  return {
    id: new Date(),
    text: enteredTask,
    checked: false
  };
};

renderToDos();

document.getElementById("addTask").addEventListener("click", () => {
  const enteredTask = document.getElementById("inputTask").value;
  if (enteredTask.trim().length === 0) {
    alert("please enter something");
    return;
  }
  toDos.push(createToDO(enteredTask));
  renderToDos();
  document.getElementById("inputTask").value = "";
  document.getElementById("inputTask").focus();
});

document.querySelector(".deleteCompletedTasks-btn").addEventListener("click", () => {
  toDos = [...toDos.filter(item => item.checked === false)];
  renderToDos();
  checkForCheckedTasks();
});