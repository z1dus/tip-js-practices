/**
 * Возвращает отфильтрованный массив задач в зависимости от выбранного фильтра.
 * @param {Array} tasks - Полный массив задач
 * @param {string} filter - Режим фильтрации ('all', 'pending', 'completed')
 * @returns {Array} Новый отфильтрованный массив
 */
export function getVisibleTasks(tasks, filter = 'all') {
  if (!Array.isArray(tasks)) return [];

  // Фильтрация не должна изменять исходные объекты
  switch (filter) {
    case 'pending':
      return tasks.filter(task => task.completed === false);
    case 'completed':
      return tasks.filter(task => task.completed === true);
    case 'all':
    default:
      return [...tasks];
  }
}
