/* eslint-disable @typescript-eslint/no-explicit-any */
import { KanbanColumnType } from "@/types/components.types";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { KanbanCard } from "./KanbanCard";

interface KanbanBoardProps {
  cols: KanbanColumnType[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ cols }) => {
  const [columns] = useState<KanbanColumnType[]>(cols);

  const onDragEnd = (result: any) => {
    console.log(result);
    // Implement reordering logic here
    // This is where you will update your columns state based on the drag result
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          gap: "20px",
          overflowX: "auto",
        }}
      >
        {columns.map((column) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <Paper
                elevation={3}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Typography variant="h6">{column.title}</Typography>
                {column.cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          margin: "8px 0",
                        }}
                      >
                        <KanbanCard card={card} key={card.id} />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};
