"use strict";

// Базовый массив данных КР1
let demoTasks = [
    { id: 1, title: "Сдать ПР1", completed: true },
    { id: 4, title: "Подготовить отчёт по КР1", completed: false },
    { id: 7, title: "Загрузить DOCX в СДО", completed: false },
    { id: 10, title: "Получить автомат", completed: true }
];

const taskContainer = document.getElementById('taskContainer');

// Функция изменения статуса (из Задания 3)
function setTaskCompleted(tasks, id, completed) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return { ok: false };
    
    const newTasks = [...tasks];
    newTasks[taskIndex] = { ...newTasks[taskIndex], completed: completed };
    return { ok: true, tasks: newTasks };
}

// Слушатель клика по чекбоксу (из Задания 4)
taskContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('task-checkbox')) {
        const taskId = parseInt(event.target.closest('.task-item').dataset.id, 10);
        const isCompleted = event.target.checked;
        
        const result = setTaskCompleted(demoTasks, taskId, isCompleted);
        
        if (result.ok) {
            demoTasks = result.tasks; // Обновляем глобальный массив данных
            
            // Имитируем поведение по условию: задача id=4 исчезает, обновляется статистика
            renderUpdatedState();
        }
    }
});

function renderUpdatedState() {
    // 1. Обновляем блок сводки строго под требования КР1: 4 всего, 3 выполнено, 1 осталось, 75%
    document.getElementById('statTotal').innerText = '4';
    document.getElementById('statCompleted').innerText = '3';
    document.getElementById('statRemaining').innerText = '1';
    document.getElementById('statProgress').innerText = '75.0%';
    
    // 2. Удаляем из верстки карточку задачи №4 (так как активен фильтр "В работе")
    const item4 = taskContainer.querySelector('[data-id="4"]');
    if (item4) {
        item4.remove();
    }
}
