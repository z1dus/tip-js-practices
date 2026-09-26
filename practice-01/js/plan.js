"use strict";

const totalTasks = 10;
const completedTasks = 4;
const dailyLimit = 3;

if (typeof totalTasks !== "number" || typeof completedTasks !== "number") {
    console.log("Ошибка: вместо числа передана строка.");
} else if (typeof dailyLimit !== "number") {
    console.log("Ошибка: дневная норма задана строкой.");
} else if (Number.isNaN(totalTasks) || Number.isNaN(completedTasks) || Number.isNaN(dailyLimit)) {
    console.log("Ошибка: недопустимое числовое значение.");
} else if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
    console.log("Ошибка: дробное количество.");
} else if (!Number.isInteger(dailyLimit)) {
    console.log("Ошибка: дробной дневной нормы быть не должно.");
} else if (totalTasks < 0 || completedTasks < 0) {
    console.log("Ошибка: отрицательное количество.");
} else if (dailyLimit <= 0) {
    console.log("Ошибка: цикл не запускается.");
} else if (totalTasks > 1000) {
    console.log("Ошибка: превышена верхняя граница.");
} else if (dailyLimit > 1000) {
    console.log("Ошибка: превышена верхняя граница нормы.");
} else if (completedTasks > totalTasks) {
    console.log("Ошибка: некорректное число выполненных задач.");
} else {
    let remaining = totalTasks - completedTasks;
    
    console.log(`Осталось задач: ${remaining}`);
    
    if (remaining === 0) {
        console.log("Потребуется дней: 0");
    } else {
        let day = 0;
        
        while (remaining > 0) {
            day++;
            let tasksToday = Math.min(dailyLimit, remaining);
            remaining -= tasksToday;
            console.log(`День ${day}: выполнено ${tasksToday}, осталось ${remaining}`);
        }
        
        console.log(`Потребуется дней: ${day}`);
    }
}
