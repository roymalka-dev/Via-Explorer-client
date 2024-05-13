import useApi from "@/hooks/useApi";
import { AnnouncementType } from "@/types/announcements.types";
import { formatDateWithHour } from "@/utils/time.utils";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const Announcements = () => {
  const { data, status, error } = useApi<AnnouncementType[]>(
    "/site/get-latest-announcements"
  );

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    console.error(error);
    return <Box>{error.message}</Box>;
  }
  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        gutterBottom
        variant="subtitle1"
        component="div"
        color="text.primary"
        sx={{
          ml: 3,
          fontSize: {
            xs: "0.875rem",
            sm: "1rem",
            md: "1.25rem",
            lg: "1.5rem",
          },
        }}
      >
        Announcements
      </Typography>
      <List>
        {data &&
          data
            .map((announcement, index) => (
              <ListItem
                key={index}
                sx={{
                  pl: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                  >
                    {announcement.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      color: "text.primary",
                      fontSize: "1rem",
                      fontWeight: "medium",
                      marginLeft: 1,
                    }}
                  >
                    : {announcement.message}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                >
                  {formatDateWithHour(announcement.date)}
                </Typography>
              </ListItem>
            ))
            .slice(0, 3)}
      </List>
    </Box>
  );
};

export default Announcements;
