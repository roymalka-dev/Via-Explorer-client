import { useState } from "react";
import {
  Typography,
  Chip,
  Modal,
  Box,
  CardMedia,
  Stack,
  Link,
  Divider,
  ListItem,
  List,
} from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";

const ViewAppRequest = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { id } = useParams();
  const { data, status, error } = useApi(`/requests/get-request-by-id/${id}`);

  const handleOpenModal = (image: string) => {
    setModalImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <Navigate to="/not-found" />;

  return status === "success" && data ? (
    <Box sx={{ mt: 2, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {data.riderAppName}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {data.riderAppShortName}
      </Typography>

      {/* Display additional information */}
      <Box>
        <Typography variant="body1">Status: {data.status}</Typography>
        <Typography variant="body1">
          Performing User: {data.performingUser}
        </Typography>
        <Typography variant="body1">Launch Date: {data.launchDate}</Typography>
        <Typography variant="body1">
          Service Type: {data.serviceType}
        </Typography>
        <Typography variant="body1">
          Payment Type: {data.servicePaymentType}
        </Typography>
        <Typography variant="body1">Powered By: {data.poweredBy}</Typography>
        <Typography variant="body1">Operated By: {data.operatedBy}</Typography>
        <Typography variant="body1">
          Auto Subscribe: {data.autoSubscribe ? "Yes" : "No"}
        </Typography>
        {data.autoSubscribeMessage && (
          <Typography variant="body1">
            Auto Subscribe Message: {data.autoSubscribeMessage}
          </Typography>
        )}
        <Typography variant="body1">
          Preferred Title: {data.preferredTitle}
        </Typography>
        <Typography variant="body1">
          Providing App Launcher: {data.providingAppLauncher ? "Yes" : "No"}
        </Typography>
        {data.appLauncher && (
          <Typography variant="body1">
            App Launcher: {data.appLauncher}
          </Typography>
        )}
        {data.preferredBrandColor && (
          <Typography variant="body1">
            Preferred Brand Color: {data.preferredBrandColor}
          </Typography>
        )}
        <Typography variant="body1">
          Choose Brand Color From Logo:{" "}
          {data.chooseBrandColorFromLogo ? "Yes" : "No"}
        </Typography>

        {/* External Links */}
        <Box sx={{ my: 2 }}>
          <Typography variant="h6">External Links:</Typography>
          <List>
            {data.externalLinks.map((link: string, index: number) => (
              <ListItem key={index}>
                <Link href={link} target="_blank">
                  {link}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Special Requirements */}
        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Special Requirements:</Typography>
          <List>
            {data.specialRequirements.map((req: string, index: number) => (
              <ListItem key={index}>{req}</ListItem>
            ))}
          </List>
        </Box>

        {/* Displaying languages as chips */}
        <Stack direction="row" spacing={1} sx={{ my: 2 }}>
          <Typography variant="h6">Languages:</Typography>
          {data.languages.map((language: string, index: number) => (
            <Chip
              key={index}
              label={language}
              variant="outlined"
              color="primary"
            />
          ))}
        </Stack>

        {/* Displaying OnBoarding steps */}
        <Box sx={{ my: 2 }}>
          <Typography variant="h6">OnBoarding Messages:</Typography>
          <List>
            {data.onBoarding.map((message: string, index: number) => (
              <ListItem key={index}>{message}</ListItem>
            ))}
          </List>
        </Box>
        {/* Displaying OnBoarding steps */}
        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Subtitle Messages:</Typography>
          <List>
            {data.subTitle.map((message: string, index: number) => (
              <ListItem key={index}>{message}</ListItem>
            ))}
          </List>
        </Box>

        {/* Images with modals */}
        <Box sx={{ display: "flex" }}>
          {data.serviceLogoImage && (
            <Box>
              <Typography variant="h6" sx={{ m: 2 }}>
                Service Logo
              </Typography>
              <CardMedia
                component="img"
                height="140"
                image={data.serviceLogoImage}
                alt="Service logo"
                sx={{ width: 100, cursor: "pointer", m: 2 }}
                onClick={() => handleOpenModal(data.serviceLogoImage)}
              />
            </Box>
          )}
          {data.skylineImage && (
            <Box>
              <Typography variant="h6" sx={{ m: 2 }}>
                SkyLine Image
              </Typography>
              <CardMedia
                component="img"
                height="140"
                image={data.skylineImage}
                alt="Skyline"
                sx={{ width: 100, cursor: "pointer", m: 2 }}
                onClick={() => handleOpenModal(data.skylineImage)}
              />
            </Box>
          )}
          {data.VehicleOptionImage && (
            <Box>
              <Typography variant="h6" sx={{ m: 2 }}>
                Vehicle Image
              </Typography>
              <CardMedia
                component="img"
                height="140"
                image={data.VehicleOptionImage}
                alt="Vehicle Option"
                sx={{ width: 100, cursor: "pointer", m: 2 }}
                onClick={() => handleOpenModal(data.VehicleOptionImage)}
              />
            </Box>
          )}
        </Box>

        {/* Modal for enlarged images */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "auto",
              maxHeight: "90%",
              overflowY: "auto",
            }}
          >
            <img src={modalImage} alt="Enlarged" style={{ width: "100%" }} />
          </Box>
        </Modal>

        {/* Additional Information */}
        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Additional information:</Typography>
          <List>
            {data.additionalInformation.map((info: string, index: number) => (
              <ListItem key={index}>{info}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
    </Box>
  ) : null; // Return null if 'status' is not 'success' or 'data' is undefined
};

export default ViewAppRequest;
