taskContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('task-checkbox')) {
        const taskId = parseInt(event.target.closest('.task-item').dataset.id, 10);
        const isCompleted = event.target.checked;
        const result = setTaskCompleted(demoTasks, taskId, isCompleted);
        if (result.ok) {
            currentTasks = result.tasks;
            renderApp();
        }
    }
});
