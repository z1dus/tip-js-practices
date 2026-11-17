import { demoTasks, variantTasks, variantNumber } from './data.js';
import { findTaskById, setTaskCompleted, removeTask } from './task-service.js';
import { getVisibleTasks } from './task-selectors.js';
import { renderTaskList, renderSummary, renderEmptyState } from './task-view.js';

// Инициализация состояния
const urlParams = new URLSearchParams(window.location.search);
const useVariant = urlParams.get('dataset') === 'variant';
const initialTasks = useVariant ? variantTasks : demoTasks;

let currentTasks = initialTasks.map(task => ({ ...task }));
let currentFilter = 'all';

// DOM Контейнеры
const listElement = document.querySelector('#task-list');
const summaryElement = document.querySelector('#task-summary');
const emptyMessageElement = document.querySelector('#empty-state-message') || document.querySelector('#task-empty');
const operationMessageElement = document.querySelector('#operation-message');
const filtersContainer = document.querySelector('#task-filters');

// Безопасная внутренняя реализация функции удержания фокуса
function applyFocusRestoration(id, action) {
  const targetCard = document.querySelector(`li[data-task-id="${id}"]`);
  if (targetCard) {
    const btn = targetCard.querySelector(`button[data-action="${action}"]`);
    if (btn) { 
      btn.focus(); 
      return; 
    }
  }
  const activeFilterBtn = document.querySelector('#task-filters .is-active');
  if (activeFilterBtn) activeFilterBtn.focus();
}

/**
 * Задание 4. Отрисовка интерфейса
 */
function renderApp() {
  const visibleTasks = getVisibleTasks(currentTasks, currentFilter);

  // Отрисовка компонентов
  renderTaskList(listElement, visibleTasks);
  renderSummary(summaryElement, currentTasks, visibleTasks.length);
  
  // Передаем правильные аргументы для расчета пустого состояния:
  // 1. Элемент сообщения
  // 2. Общее количество задач в системе (currentTasks.length)
  // 3. Количество отфильтрованных/видимых задач (visibleTasks.length)
  renderEmptyState(emptyMessageElement, currentTasks.length, visibleTasks.length);

  // Синхронизация классов фильтров
  if (filtersContainer) {
    const filterButtons = filtersContainer.querySelectorAll('button[data-filter]');
    filterButtons.forEach(btn => {
      const isCurrent = btn.getAttribute('data-filter') === currentFilter;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });
  }
}

/**
 * Задание 3. Обработчик кликов по списку задач
 */
function handleTaskListClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest('button[data-action]');
  if (!button || !listElement.contains(button)) return;

  const action = button.getAttribute('data-action');
  if (action !== 'toggle' && action !== 'delete') return;

  const card = button.closest('li[data-task-id]');
  if (!card) return;

  const rawId = card.getAttribute('data-task-id');
  const id = Number(rawId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    if (operationMessageElement) {
      operationMessageElement.textContent = 'Ошибка: Некорректный идентификатор задачи.';
    }
    return;
  }

  if (action === 'toggle') {
    const task = findTaskById(currentTasks, id);
    if (!task) {
      if (operationMessageElement) operationMessageElement.textContent = `Задача с id ${id} не найдена.`;
      return;
    }
    
    const result = setTaskCompleted(currentTasks, id, !task.completed);
    if (result.ok) {
      currentTasks = result.tasks;
      if (operationMessageElement) operationMessageElement.textContent = '';
      renderApp();
      applyFocusRestoration(id, 'toggle');
    } else {
      if (operationMessageElement) operationMessageElement.textContent = result.error;
    }
  } 
  
  else if (action === 'delete') {
    const result = removeTask(currentTasks, id);
    if (result.ok) {
      currentTasks = result.tasks;
      if (operationMessageElement) operationMessageElement.textContent = '';
      renderApp();
      applyFocusRestoration(id, 'delete');
    } else {
      if (operationMessageElement) operationMessageElement.textContent = result.error;
    }
  }
}

/**
 * Задание 4. Обработчик кликов по фильтрам
 */
function handleFilterClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest('button[data-filter]');
  if (!button || !filtersContainer.contains(button)) return;

  const selectedFilter = button.getAttribute('data-filter');
  
  if (selectedFilter === 'all' || selectedFilter === 'pending' || selectedFilter === 'completed') {
    currentFilter = selectedFilter;
    if (operationMessageElement) operationMessageElement.textContent = '';
    renderApp();
  }
}

// Инициализация событий
if (listElement) {
  listElement.addEventListener('click', handleTaskListClick);
}

if (filtersContainer) {
  filtersContainer.addEventListener('click', handleFilterClick);
}

// Стартовый рендер
renderApp();
