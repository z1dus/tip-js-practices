// Лабораторная работа № 2: Эксперименты со ссылками и типами данных

console.log("=== ЭКСПЕРИМЕНТ 1: Параметры и типы ===");
function sum(a, b) {
    return a + b;
}
console.log("sum(5, 10) -> type:", typeof sum(5, 10), "val:", sum(5, 10));
console.log("sum(5, '10') -> type:", typeof sum(5, '10'), "val:", sum(5, '10'));


console.log("\n=== ЭКСПЕРИМЕНТ 2: Стрелочные функции ===");
// Исправлено: добавлен явный возврат значения из фигурных скобок
const square = (value) => {
    return value * value;
};
console.log("square(4) -> type:", typeof square(4), "val:", square(4));


console.log("\n=== ЭКСПЕРИМЕНТ 3: Ссылки на объекты ===");
const originalObj = { title: "Черновик", published: false };
const aliasObj = originalObj;
aliasObj.published = true;
console.log("originalObj.published:", originalObj.published);
console.log("originalObj === aliasObj:", originalObj === aliasObj);


console.log("\n=== ЭКСПЕРИМЕНТ 4: Поверхностное копирование массива ===");
const originalArray = [
    { id: 1, completed: false },
    { id: 2, completed: false }
];
const copyArray = [...originalArray];
copyArray[0].completed = true;

console.log("originalArray !== copyArray (разные массивы):", originalArray !== copyArray);
console.log("originalArray[0].completed (объект мутировал):", originalArray[0].completed);


console.log("\n=== ЭКСПЕРИМЕНТ 5: Поверхностное копирование объекта ===");
const oldTask = { id: 10, title: "Старое название", completed: false };
const newTask = { ...oldTask, title: "Новое название" };

console.log("oldTask.title:", oldTask.title);
console.log("newTask.title:", newTask.title);
console.log("oldTask !== newTask:", oldTask !== newTask);


console.log("\n=== ЭКСПЕРИМЕНТ 6: Параметры по умолчанию ===");
function greet(name = "Гость") {
    return `Привет, ${name}!`;
}
console.log("greet() ->", greet());
console.log("greet(undefined) ->", greet(undefined));
console.log("greet(null) ->", greet(null));
console.log("greet('') ->", greet(''));