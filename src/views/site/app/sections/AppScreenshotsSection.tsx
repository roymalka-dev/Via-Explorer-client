import ImageCarousel from "@/components/shared/common/carousel/ImageCarousel";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AppScreenshotsSectionProps {
  iosScreenshots: string[] | undefined;
  androidScreenshots: string[] | undefined;
}

const AppScreenshotsSection: React.FC<AppScreenshotsSectionProps> = ({
  iosScreenshots,
  androidScreenshots,
}) => {
  const { t } = useTranslation();
  return (
    <Box>
      {iosScreenshots && iosScreenshots.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t("site.pages.app.sections.screenshots.ios")}
          </Typography>
          <ImageCarousel images={iosScreenshots} />
        </Box>
      )}

      {androidScreenshots && androidScreenshots.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t("site.pages.app.sections.screenshots.android")}
          </Typography>
          <ImageCarousel images={androidScreenshots} />
        </Box>
      )}
    </Box>
  );
};

export default AppScreenshotsSection;
