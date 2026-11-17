"use strict";

const demoTasks = [
    { id: 1, title: "Сдать ПР1", completed: true },
    { id: 4, title: "Подготовить отчёт по КР1", completed: false },
    { id: 7, title: "Загрузить DOCX в СДО", completed: false },
    { id: 10, title: "Получить автомат", completed: true }
];

/**
 * Функция изменения статуса задачи
 * @param {Array} tasks - Исходный массив задач
 * @param {number} id - Положительное безопасное целое число
 * @param {boolean} completed - Строго true или false
 */
function setTaskCompleted(tasks, id, completed) {
    // 1. Валидация аргументов
    if (typeof id !== "number" || !Number.isInteger(id) || id <= 0 || !Number.isSafeInteger(id)) {
        return { ok: false, error: "Идентификатор должен быть положительным безопасным целым числом" };
    }
    if (typeof completed !== "boolean") {
        return { ok: false, error: "Статус должен быть строго логического типа (true/false)" };
    }

    // 2. Поиск задачи в массиве
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return { ok: false, error: `Задача с id ${id} не найдена` };
    }

    // 3. Создание копий без мутации исходных данных
    const newTasks = [...tasks];
    newTasks[taskIndex] = { ...newTasks[taskIndex], completed: completed };

    return { ok: true, tasks: newTasks };
}

console.log("=== ПРОВЕРКА 1: Успешное изменение id = 4 на true ===");
const resultSuccess = setTaskCompleted(demoTasks, 4, true);

if (resultSuccess.ok) {
    const originalTask4 = demoTasks.find(t => t.id === 4);
    const updatedTask4 = resultSuccess.tasks.find(t => t.id === 4);
    
    console.log("Результат вызова (успех):", resultSuccess.ok);
    console.log("Статус id=4 в ИСХОДНОМ массиве (ожидается false):", originalTask4.completed);
    console.log("Статус id=4 в НОВОМ массиве (ожидается true):", updatedTask4.completed);
}

console.log("\n=== ПРОВЕРКА 2: Попытка вызвать несуществующий id = 777 ===");
const resultFail = setTaskCompleted(demoTasks, 777, true);
console.log("Результат вызова (ошибка):", resultFail);