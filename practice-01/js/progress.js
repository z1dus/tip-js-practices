"use strict";

function checkProgress(totalTasks, completedTasks) {
    if (typeof totalTasks !== "number" || typeof completedTasks !== "number" || Number.isNaN(totalTasks) || Number.isNaN(completedTasks)) {
        console.log("Ошибка: недопустимое числовое значение или вместо числа передана строка.");
    } else if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
        console.log("Ошибка: дробное количество.");
    } else if (totalTasks < 0 || completedTasks < 0) {
        console.log("Ошибка: отрицательное количество.");
    } else if (totalTasks > 1000) {
        console.log("Ошибка: превышена верхняя граница.");
    } else if (completedTasks > totalTasks) {
        console.log("Ошибка: выполнено больше, чем существует.");
    } else if (totalTasks === 0 && completedTasks === 0) {
        console.log(`(${totalTasks}, ${completedTasks}) → Задач пока нет`);
    } else {
        const remainingTasks = totalTasks - completedTasks;
        const progressPercent = ((completedTasks / totalTasks) * 100).toFixed(1);
        
        let status = "";
        if (completedTasks === 0) {
            status = "Не начато";
        } else if (completedTasks === totalTasks) {
            status = "Завершено";
        } else {
            status = "В работе";
        }

        console.log(`(${totalTasks}, ${completedTasks}) → осталось ${remainingTasks}, прогресс ${progressPercent}%, «${status}»`);
    }
}

checkProgress(12, 5);
checkProgress(0, 0);
checkProgress(5, 6);
