alert('Görev eklemek için Yapılacak işi girdikten sonra ENTER a basınız');
let tasks = [];                                                     //görevlerimi barındran dizi

function addTask() {                                                //Task ları Tasks dizesinin içine atan fonksiyon
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        taskInput.value = '';
        renderTasks(tasks);
    }
}

function renderTasks(selectedtasks) {                               //seçili Tasks ları listeleyip task ların elemanlarını oluşturan fonksiyon
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    selectedtasks.forEach(task => {

        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';


        const taskText = document.createElement('span');
        taskText.innerText = task.text;

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '...';
        editBtn.id = 'editBtn' + task.id;
        editBtn.onclick = () => showhideBtn(editBtn.id, taskDiv2.id);

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(editBtn);
        taskList.appendChild(taskDiv);

        const taskDiv2 = document.createElement('div');
        taskDiv2.className = 'task2';
        taskDiv2.id = 'taskDiv2' + task.id;

        const editBtn2 = document.createElement('span');
        editBtn2.className = 'edit-btn2';
        editBtn2.innerHTML = ' &#9999; Düzenle';
        editBtn2.onclick = () => editTask(task, task.id);

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = ' &#128465; Sil';
        deleteBtn.onclick = () => deleteTask(task.id);

        taskDiv2.appendChild(editBtn2);
        taskDiv2.appendChild(deleteBtn);
        taskDiv.appendChild(taskDiv2);

        if (task.completed == true) {
            checkbox.checked = true;
            taskText.style.textDecoration = 'line-through';
        }
        else {
            taskText.style.textDecoration = 'none';
            task.completed = false;
        }

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                taskText.style.textDecoration = 'line-through';
                task.completed = true;
            } else {
                taskText.style.textDecoration = 'none';
                task.completed = false;
            }
        });


    });
}

function activeTasks() {                                                        //Checkboxı işaretlenmemiş görevleri listeleyen fonksiyon
    var activeTasks = tasks.filter(task => task.completed == false);
    renderTasks(activeTasks);
}

function complatedTasks() {                                                     //Checkboxı işaretlenmiş görevleri listeleyen fonksiyon
    var completedTasks = tasks.filter(task => task.completed == true);
    renderTasks(completedTasks);
}

function clearAll() {                                                           //Tüm görevleri silen fonksiyon
    tasks = [];
    taskList.innerHTML = '__Yapılacaklar Listesi Boş__';
}


function showhideBtn(editBtnID, taskDiv2ID) {                                   //Üç nokta butonuna basılınca üç nokta butonunu ve diğer butonların divini toggle eden fonksiyon
    $(".task2").not("#" + taskDiv2ID).hide();
    $("#" + taskDiv2ID).toggle();
    $(".edit-btn").not("#" + editBtnID).show();
    $("#" + editBtnID).toggle();
}

function deleteTask(taskId) {                                                   //Seçili görevleri silen fonksiyon
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks(tasks);
    if (tasks.length == []) {
        taskList.innerHTML = '__Yapılacaklar Listesi Boş__';
    }
}

function editTask(task, taskID) {                                               //Seçili görevi düzenleyen fonskiyon
    taskInput.value = task.text;
    taskInput.focus();
    deleteTask(taskID);
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('taskInput').addEventListener('keydown', function (e) {        //Entera basınca görevi ekleyen fonksiyon
        if (e.key === 'Enter') {
            addTask();
        }
    });

    document.addEventListener('click', function (event) {                                   //3 nokta butnuna basıldıktan sonra başka biryere basınca açılan divi kapatan fonksiyon
        const clickedElement = event.target;
        if (!clickedElement.closest('.edit-btn') && !clickedElement.closest('.task2')) {
            $(".edit-btn").show();
            $(".task2").hide();
        }
    });
});





// function editTask(task, taskID) {                                                        //Burada düzenleyi farklı bir şekilde yapmaya çalıştım ama hiçbir hata olmamasına rağmen çalışmadı :'(
//     taskInput.value = task;
//     taskInput.focus();
//     taskInput.addEventListener('keydown', function (e) {
//         if (e.key === 'Enter') {
//             task.text = taskInput.value;
//             taskInput.removeEventListener('keydown', arguments.callee);
//         }
//         renderTasks(tasks);
//     });
// } 