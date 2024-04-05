import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import fallbackImageUrl from "@/assets/images/no-image.png";
import { appType } from "@/types/app.types";
const AppCard: React.FC<{ app: appType }> = ({ app }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card
      dir={"ltr"}
      sx={{
        width: { xs: 125, md: 150 }, // Set the width to ensure all cards are the same size
        position: "relative",
        borderRadius: 3,
      }}
    >
      <CardActionArea
        sx={{ width: "100%", height: "100%" }}
        onClick={() => navigate(`/app/${app.id}`)}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            maxHeight: 150, // Limit the maximum height of the image
          }}
          image={app.imageUrl || fallbackImageUrl}
          alt={app.name}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: alpha(theme.palette.background.default, 0.9),
            padding: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis", // Truncate the name if it's too long
          }}
        >
          <Typography
            variant="subtitle2"
            component="div"
            color="text.primary"
            sx={{
              fontSize: "0.875rem",
            }}
          >
            {app.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.75rem",
            }}
          >
            {app.city + " " + app.id}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default AppCard;
