import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  try {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage", error);
    return [];
  }
};

const initialState = {
  tasks: loadTasksFromLocalStorage(),
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTaskPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.priority = priority;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, deleteTask, updateTaskPriority } = tasksSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectTasksByPriority = (priority) => (state) =>
  state.tasks.tasks.filter((task) => task.priority === priority);

export default tasksSlice.reducer;
