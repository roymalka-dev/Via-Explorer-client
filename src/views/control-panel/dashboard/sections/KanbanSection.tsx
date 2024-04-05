import { KanbanBoard } from "@/components/shared/common/kanban/KanbanBoard";
import { KanbanColumnType } from "@/types/components.types";
const initialColumns: KanbanColumnType[] = [
  {
    id: "column-1",
    title: "To Do",
    cards: [
      {
        id: "item-1",
        title: "Task 1",
        description: "This is the first task in the To Do list.",
        assignedTo: "Alice Johnson",
        dueDate: "2024-04-15",
      },
      {
        id: "item-2",
        title: "Task 2",
        description: "This is the second task, needing review.",
        assignedTo: "Bob Smith",
        dueDate: "2024-04-20",
      },
    ],
  },
  {
    id: "column-2",
    title: "In Progress",
    cards: [
      {
        id: "item-3",
        title: "Task 3",
        description: "This task is currently being worked on.",
        assignedTo: "Charlie Davis",
        dueDate: "2024-04-18",
      },
    ],
  },
  {
    id: "column-3",
    title: "Done",
    cards: [
      {
        id: "item-4",
        title: "Task 4",
        description: "This task is currently being worked on.",
        assignedTo: "Charlie Davis",
        dueDate: "2024-04-18",
      },
    ],
  },
  // You can add more columns and cards as needed
];

const KanbanSection = () => {
  return <KanbanBoard cols={initialColumns} />;
};

export default KanbanSection;
