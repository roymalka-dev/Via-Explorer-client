/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  CardMedia,
  Stack,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { useTranslation } from "react-i18next";
import { appType } from "@/types/app.types";
import useApi from "@/hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "@/configs/toast.config";

import fallbackImageUrl from "@/assets/images/no-image.png";
import { CustomTabPanelType } from "@/types/components.types";
import CustomTabs from "@/components/shared/common/tabs/CustomTabs";

const AppScreenshotsSection = lazy(
  () => import("@/views/site/app/sections/AppScreenshotsSection")
);
const AppBuildManagerSection = lazy(
  () => import("@/views/site/app/sections/AppBuildManagerSection")
);

const AppPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const params = useParams<{ id: string }>();
  const appData = useApi<appType>(`app/get-app/${params.id}`);

  const toggleFavorite = useApi(
    `user/toggle-user-favorite/${params.id}`,
    "POST",
    {},
    [],
    true
  );

  const appsTabs: CustomTabPanelType[] = [
    {
      label: "build manager",
      locale: "site.pages.app.sections.buildManager.title",
      component: AppBuildManagerSection,
    },
    {
      label: "screenshots",
      locale: "site.pages.app.sections.screenshots.title",
      component: AppScreenshotsSection,
      data: {
        iosScreenshots: appData.data?.iosScreenshots,
        androidScreenshots: appData.data?.androidScreenshots,
      },
    },
  ];

  const userFavorites = useApi(`user/get-user-favorites`, "GET", {}, [], true);

  const toggleFavoriteHandler = async () => {
    await toggleFavorite.refetch();
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    userFavorites.refetch().then(() => {
      const isFav = userFavorites.data?.some(
        (fav: any) => fav.id === params.id
      );
      setIsFavorite(isFav);
    });
  }, []);

  useEffect(() => {
    if ((appData.error as any)?.response?.status === 404) {
      toast.error(
        appData.error?.message || t("shared.messages.error.default"),
        toastConfig
      );
      navigate("/not-found");
    }
  }, [appData.error, navigate, t]);

  if (appData.status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return appData.data ? (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {/* Image and Action Buttons */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          order: { xs: -1, md: 0 }, // Moves this Grid item to the top on xs screens
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 180, height: 180, borderRadius: "10%" }}
          image={appData.data.imageUrl || fallbackImageUrl}
          alt={appData.data.name}
        />

        <Stack direction="row" spacing={1}>
          <IconButton aria-label="share" size="large">
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={() => toggleFavoriteHandler()}
            aria-label={
              isFavorite ? t("removeFromFavorites") : t("addToFavorites")
            }
            size="large"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Stack>
      </Grid>

      {/* App Details and Store Buttons */}
      <Grid item xs={12} md={8}>
        <Typography
          variant="h3"
          component="div"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          {appData.data.name}
          <Typography variant="body2" color="text.secondary">
            {appData.data.id}
          </Typography>
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
        >{`${appData.data.city}, ${appData.data.country}`}</Typography>
        <Typography
          variant="body2"
          gutterBottom
        >{`Region: ${appData.data.region}`}</Typography>
        <Typography
          variant="body2"
          gutterBottom
        >{`Env: ${appData.data.env}`}</Typography>
        <Typography
          variant="body2"
          gutterBottom
        >{`Tenant: ${appData.data.tenant}`}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {appData.data.iosLink && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AppleIcon />}
              href={appData.data.iosLink}
              target="_blank"
              aria-label="App Store"
              sx={{ width: "100%" }}
            >
              iOS {appData.data.iosVersion}
            </Button>
          )}
          {appData.data.androidLink && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AndroidIcon />}
              href={appData.data.androidLink}
              target="_blank"
              aria-label="Google Play Store"
              sx={{ width: "100%" }}
            >
              Android {appData.data.androidVersion}
            </Button>
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", overflow: "x" }}>
        <CustomTabs tabs={appsTabs} />
      </Grid>
    </Grid>
  ) : null;
};

export default AppPage;
