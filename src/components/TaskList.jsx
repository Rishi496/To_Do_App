import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTaskPriority } from "../features/tasks/tasksSlice";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  if (tasks.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        No tasks yet. Add one above!
      </Typography>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          secondaryAction={
            <IconButton
              edge="end"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={task.text} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Select
              value={task.priority}
              onChange={(e) =>
                dispatch(
                  updateTaskPriority({ id: task.id, priority: e.target.value })
                )
              }
              size="small"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
            <Chip
              label={task.priority}
              color={getPriorityColor(task.priority)}
              size="small"
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
