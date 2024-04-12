/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { KanbanCard } from "./KanbanCard";
import { KanbanColumnType } from "@/types/components.types";

interface KanbanBoardProps {
  cols: KanbanColumnType[];
  onDragEndHandler: (result: any) => Promise<boolean>;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  cols,
  onDragEndHandler,
}) => {
  const [columns, setColumns] = useState<KanbanColumnType[]>(cols);

  useEffect(() => {
    setColumns(cols);
  }, [cols]);

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceColIndex = columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = columns.findIndex(
      (col) => col.id === destination.droppableId
    );
    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];
    const removed = sourceCol.cards[source.index];
    const newSourceCards = [...sourceCol.cards];
    newSourceCards.splice(source.index, 1);
    const newDestCards = [...destCol.cards];
    newDestCards.splice(destination.index, 0, removed);

    const newColumns = [...columns];
    newColumns[sourceColIndex] = {
      ...sourceCol,
      cards: newSourceCards,
    };
    newColumns[destColIndex] = {
      ...destCol,
      cards: newDestCards,
    };
    setColumns(newColumns);

    const success = await onDragEndHandler(result);
    if (!success) {
      setColumns(columns);
      return;
    }
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
                sx={{ minWidth: "200px" }}
                elevation={3}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Typography variant="h6" sx={{ padding: "10px" }}>
                  {column.title}
                </Typography>
                {column.cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ margin: "8px 0" }}
                      >
                        <KanbanCard card={card} />
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
