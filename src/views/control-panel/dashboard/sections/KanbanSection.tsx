/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { KanbanBoard } from "@/components/shared/common/kanban/KanbanBoard";
import useApi from "@/hooks/useApi";
import ApiService from "@/services/ApiService";
import { setRequests } from "@/store/slices/requestsSlice";
import { RootState } from "@/store/store";
import { KanbanCardType, KanbanColumnType } from "@/types/components.types";
import { RequestType } from "@/types/request.types";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "react-toastify";
import { toastConfig } from "@/configs/toast.config";

const KanbanSection = () => {
  const requests = useSelector((state: RootState) => state.requests);
  const dispatch = useDispatch();
  const [cols, setCols] = useState<KanbanColumnType[]>([]);

  const onDragEndHandler = async (result: any): Promise<boolean> => {
    const success = await ApiService.put("requests/update-request-status", {
      requestId: result.draggableId,
      status: result.destination.droppableId,
    });

    if (success) {
      const updatedRequests = requests.data.map((request: RequestType) => {
        if (request.id === result.draggableId) {
          return { ...request, status: result.destination.droppableId };
        }
        return request;
      });

      dispatch(setRequests({ requests: updatedRequests }));
      toast.success("Request status updated successfully", toastConfig);
      return true;
    } else {
      toast.error("Failed to update request status", toastConfig);
      return false;
    }
  };

  const { data, status, refetch } = useApi<RequestType[]>(
    "requests/get-all-requests",
    "GET",
    {},
    [],
    true
  );

  const genreateKanbanCols = (data: any): KanbanColumnType[] => {
    const todo: KanbanColumnType = {
      id: "todo",
      title: "To Do",
      cards: [],
    };
    const inProgress: KanbanColumnType = {
      id: "inProgress",
      title: "In Progress",
      cards: [],
    };
    const done: KanbanColumnType = {
      id: "done",
      title: "Done",
      cards: [],
    };

    const baseLink = "/requests/view/";

    data?.forEach((request: any) => {
      const task: KanbanCardType = {
        id: request.id,
        title: request.riderAppName,
        performingUser: request.performingUser,
        launchDate: request.launchDate,
        link: baseLink + request.id,
      };

      if (request.status === "todo") {
        todo.cards.push(task);
      } else if (request.status === "inProgress") {
        inProgress.cards.push(task);
      } else if (request.status === "done") {
        done.cards.push(task);
      }
    });

    const cols: KanbanColumnType[] = [todo, inProgress, done];

    return cols;
  };

  useEffect(() => {
    if (requests?.data.length > 0) {
      const kanbanCols = genreateKanbanCols(requests.data);
      setCols(kanbanCols);
    } else if (status === "idle" || status === "error") {
      refetch();
    }
  }, [requests, status]);

  useEffect(() => {
    if (status === "success" && data) {
      const kanbanCols = genreateKanbanCols(data);
      setCols(kanbanCols);
      dispatch(setRequests({ requests: data }));
    }
  }, [status, data, dispatch]);

  const refecthData = () => {
    setCols([]);
    dispatch(setRequests({ requests: [] }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Button onClick={refecthData} variant="outlined" sx={{ mr: 3 }}>
          <RefreshIcon />
        </Button>
      </Box>

      <KanbanBoard cols={cols} onDragEndHandler={onDragEndHandler} />
    </Box>
  );
};

export default KanbanSection;
