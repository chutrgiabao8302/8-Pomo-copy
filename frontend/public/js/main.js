let focusButton = document.getElementById("focus");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");

let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");

let buttons = document.querySelectorAll(".btn");

let time = document.getElementById("time");

let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task');
const addButton = document.getElementById('add');

// Add '0' before a number if it's < 10
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");

  if (pause) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});

function addTask() {
 const taskText = taskInput.value.trim();
 if (taskText !== '') {
     const li = document.createElement('li');
     li.innerHTML = `
         <span class="task">${taskText}</span>
         <button class="finish-button">Finish</button>
         <button class="delete-button">Delete</button>
     `;
     taskList.appendChild(li);
     taskInput.value = '';

     const deleteButton = li.querySelector('.delete-button');
     deleteButton.addEventListener('click', () => {
         taskList.removeChild(li);
     });

     const finishButton = li.querySelector('.finish-button');
     finishButton.addEventListener('click', () => {
         li.querySelector('.task').classList.add('task-finished');
         finishButton.disabled = true;
     });
 }
}

addButton.addEventListener('click', () => {
  addTask();
});

function handleKeyUp(event) {
  if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
      addTask();
  }
}