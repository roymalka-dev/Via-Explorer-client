import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import { KanbanCardType } from "@/types/components.types";
interface KanbanCardProps {
  card: KanbanCardType;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ card }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {card.description}
        </Typography>
        <Typography variant="body2">
          <PersonIcon /> {card.assignedTo}
          <br />
          <EventIcon /> {card.dueDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
