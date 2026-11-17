"use strict";

const demoTasks = [
    { id: 1, title: "Сдать ПР1", completed: true },
    { id: 4, title: "Подготовить отчёт по КР1", completed: false },
    { id: 7, title: "Загрузить DOCX в СДО", completed: false },
    { id: 10, title: "Получить автомат", completed: true }
];

/**
 * Функция отбора невыполненных задач
 * @param {Array} tasks - Исходный массив задач
 * @returns {Array} - Новый массив, содержащий только задачи с completed === false
 */
function getPendingTasks(tasks) {
    return tasks.filter(task => task.completed === false);
}

const resultDemo = getPendingTasks(demoTasks);
console.log("Результат для demoTasks:", resultDemo);

const resultEmpty = getPendingTasks([]);
console.log("Результат для пустой строки/массива []:", resultEmpty);
