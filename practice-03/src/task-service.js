export function findTaskById(tasks, id) {
  if (!Array.isArray(tasks)) return undefined;
  const targetId = Number(id);
  return tasks.find(task => task.id === targetId);
}

export function getTaskStats(tasks) {
  const tasksArray = Array.isArray(tasks) ? tasks : [];
  const total = tasksArray.length;
  const completed = tasksArray.filter(t => t.completed === true).length;
  const pending = total - completed;
  
  // ТРЕБОВАНИЕ ПР3: progress должен быть СТРОКОЙ со знаком % и одним знаком после точки
  const progress = total > 0 ? `${((completed / total) * 100).toFixed(1)}%` : '0.0%';
  
  return { total, completed, pending, progress };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!Array.isArray(tasks)) return { ok: false, error: 'Некорректный массив' };
  const targetId = Number(id);
  const taskExists = tasks.some(t => t.id === targetId);
  if (!taskExists) return { ok: false, error: `Задача с id ${id} не найдена` };
  
  const newTasks = tasks.map(t => t.id === targetId ? { ...t, completed: !!completed } : t);
  return { ok: true, tasks: newTasks };
}

export function removeTask(tasks, id) {
  if (!Array.isArray(tasks)) return { ok: false, error: 'Некорректный массив' };
  const targetId = Number(id);
  const taskExists = tasks.some(t => t.id === targetId);
  if (!taskExists) return { ok: false, error: `Задача с id ${id} не найдена` };
  
  const newTasks = tasks.filter(t => t.id !== targetId);
  return { ok: true, tasks: newTasks };
}
