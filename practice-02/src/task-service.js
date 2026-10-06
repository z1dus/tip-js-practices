export function createTask(id, title, priority = "medium") {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "Идентификатор должен быть положительным безопасным целым числом" };
    }
    if (typeof title !== "string") {
        return { ok: false, error: "Название должно быть строкой" };
    }
    const cleanTitle = title.trim();
    if (cleanTitle.length < 1 || cleanTitle.length > 100) {
        return { ok: false, error: "Длина названия после очистки пробелов должна быть от 1 до 100 символов" };
    }
    if (priority !== "low" && priority !== "medium" && priority !== "high") {
        return { ok: false, error: "Недопустимое значение приоритета" };
    }
    return {
        ok: true,
        task: {
            id,
            title: cleanTitle,
            completed: false,
            priority
        }
    };
}

export function findTaskById(tasks, id) {
    return tasks.find(task => task.id === id);
}

export function getPendingTasks(tasks) {
    return tasks.filter(task => task.completed === false);
}

export function getTaskTitles(tasks) {
    return tasks.map(task => task.title);
}

export function getTaskStats(tasks) {
    const total = tasks.length;
    if (total === 0) {
        return { total: 0, completed: 0, pending: 0, progress: 0 };
    }
    const completed = tasks.filter(task => task.completed === true).length;
    const pending = total - completed;
    const progress = (completed / total) * 100;
    return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "Некорректный идентификатор" };
    }
    if (findTaskById(tasks, id) !== undefined) {
        return { ok: false, error: "Задача с таким идентификатором уже существует" };
    }
    const createResult = createTask(id, title, priority);
    if (!createResult.ok) {
        return { ok: false, error: createResult.error };
    }
    return {
        ok: true,
        tasks: [...tasks, createResult.task]
    };
}

export function setTaskCompleted(tasks, id, completed) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "Некорректный идентификатор" };
    }
    if (typeof completed !== "boolean") {
        return { ok: false, error: "Статус выполнения должен быть логического типа" };
    }
    if (findTaskById(tasks, id) === undefined) {
        return { ok: false, error: "Задача не найдена" };
    }
    return {
        ok: true,
        tasks: tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed };
            }
            return task;
        })
    };
}

export function renameTask(tasks, id, title) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "Некорректный идентификатор" };
    }
    if (findTaskById(tasks, id) === undefined) {
        return { ok: false, error: "Задача не найдена" };
    }
    if (typeof title !== "string") {
        return { ok: false, error: "Название должно быть строкой" };
    }
    const cleanTitle = title.trim();
    if (cleanTitle.length < 1 || cleanTitle.length > 100) {
        return { ok: false, error: "Некорректная длина нового названия" };
    }
    return {
        ok: true,
        tasks: tasks.map(task => {
            if (task.id === id) {
                return { ...task, title: cleanTitle };
            }
            return task;
        })
    };
}

export function removeTask(tasks, id) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "Некорректный идентификатор" };
    }
    if (findTaskById(tasks, id) === undefined) {
        return { ok: false, error: "Задача не найдена" };
    }
    return {
        ok: true,
        tasks: tasks.filter(task => task.id !== id)
    };
}