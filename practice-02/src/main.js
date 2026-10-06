import { demoTasks, variantTasks, variantNumber } from "./data.js";
import {
    findTaskById,
    getPendingTasks,
    getTaskTitles,
    getTaskStats,
    addTask,
    setTaskCompleted,
    renameTask,
    removeTask
} from "./task-service.js";

console.log("=== ПРАКТИЧЕСКАЯ РАБОТА № 2 ===");
console.log(`Успешный импорт данных. Номер варианта: ${variantNumber}\n`);

// ==========================================
// 1. ОБЩИЙ СЦЕНАРИЙ (demoTasks)
// ==========================================
console.log(">>> ЗАПУСК ОБЩЕГО СЦЕНАРИЯ <<<");

let currentTasks = demoTasks;

// Вывод исходных данных
console.log("Исходные задачи:", currentTasks);
console.log("Названия задач:", getTaskTitles(currentTasks));
console.log("Невыполненные задачи (ID):", getPendingTasks(currentTasks).map(t => t.id));

const printStats = (tasks, label) => {
    const { total, completed, pending, progress } = getTaskStats(tasks);
    if (total === 0) {
        console.log(`[${label}] Задач пока нет`);
    } else {
        console.log(`[${label}] Всего: ${total}; Выполнено: ${completed}; Осталось: ${pending}; Прогресс: ${progress.toFixed(1)}%`);
    }
};

printStats(currentTasks, "Исходный набор");

// Шаг 2: Добавление задачи id = 20
const addResult = addTask(currentTasks, 20, "Добавить проверку", "high");
if (addResult.ok) {
    currentTasks = addResult.tasks;
    printStats(currentTasks, "После добавления id=20");
} else {
    console.error("Ошибка при добавлении:", addResult.error);
}

// Шаг 3: Установить completed = true для id = 4
const completeResult = setTaskCompleted(currentTasks, 4, true);
if (completeResult.ok) {
    currentTasks = completeResult.tasks;
    printStats(currentTasks, "После выполнения id=4");
} else {
    console.error("Ошибка при изменении статуса:", completeResult.error);
}

// Шаг 4: Переименовать задачу id = 10
const renameResult = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
if (renameResult.ok) {
    currentTasks = renameResult.tasks;
    printStats(currentTasks, "После переименования id=10");
} else {
    console.error("Ошибка при переименовании:", renameResult.error);
}

// Шаг 5: Удалить задачу id = 7
const removeResult = removeTask(currentTasks, 7);
if (removeResult.ok) {
    currentTasks = removeResult.tasks;
    printStats(currentTasks, "После удаления id=7");
} else {
    console.error("Ошибка при удалении:", removeResult.error);
}

// Шаг 6: Демонстрация обработки отказа (повторный ID)
console.log("\nПроверка обработки отказа (добавление дубликата ID=20):");
const failResult = addTask(currentTasks, 20, "Дубликат", "low");
if (!failResult.ok) {
    console.log(`Успешно обработан ожидаемый отказ: "${failResult.error}"`);
} else {
    console.error("Ошибка: операция должна была завершиться отказом!");
}

// Шаг 7: Проверка иммутабельности исходного demoTasks
const isDemoTasksSafe = demoTasks.length === 4 && demoTasks[1].completed === false && demoTasks[3].title === "Оформить README";
console.log(`\nИсходный массив demoTasks не изменился: ${isDemoTasksSafe}`);

// ==========================================
// 2. ИНДИВИДУАЛЬНЫЙ СЦЕНАРИЙ (Вариант 2)
// ==========================================
console.log("\n>>> ЗАПУСК ИНДИВИДУАЛЬНОГО СЦЕНАРИЯ (ВАРИАНТ 2) <<<");

let vTasks = variantTasks;
printStats(vTasks, "Вариант 2: Исходный набор");

// Шаг 2: Добавить задачу id = 80 (Приоритет medium по ТЗ для Варианта 2)
const vAddResult = addTask(vTasks, 80, "Провести генеральную репетицию", "medium");
if (vAddResult.ok) {
    vTasks = vAddResult.tasks;
    printStats(vTasks, "Вариант 2: После добавления id=80");
}

// Шаг 3: Установить completed = true для id = 11
const vCompleteResult = setTaskCompleted(vTasks, 11, true);
if (vCompleteResult.ok) {
    vTasks = vCompleteResult.tasks;
    printStats(vTasks, "Вариант 2: После выполнения id=11");
}

// Шаг 4: Переименовать id = 23
const vRenameResult = renameTask(vTasks, 23, "Согласовать структуру презентации с куратором");
if (vRenameResult.ok) {
    vTasks = vRenameResult.tasks;
    printStats(vTasks, "Вариант 2: После переименования id=23");
}

// Шаг 5: Удалить id = 37
const vRemoveResult = removeTask(vTasks, 37);
if (vRemoveResult.ok) {
    vTasks = vRemoveResult.tasks;
    printStats(vTasks, "Вариант 2: После удаления id=37");
}

// Шаг 6: Повторное добавление id = 80 (Отказ)
console.log("\nВариант 2: Проверка повторного добавления ID=80:");
const vFailResult = addTask(vTasks, 80, "Повтор репетиции", "high");
if (!vFailResult.ok) {
    console.log(`Успешно обработан отказ варианта: "${vFailResult.error}"`);
}

// Шаг 7: Проверка сохранности variantTasks
const isVariantTasksSafe = variantTasks.length === 6 && variantTasks[0].completed === true && variantTasks[1].title === "Составить план выступления";
console.log(`Исходный массив variantTasks не изменился: ${isVariantTasksSafe}`);
    