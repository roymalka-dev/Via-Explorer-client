import { Box } from "@mui/material";
import AppCard from "../../ui/cards/AppCard";
import { appType } from "@/types/app.types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type AppCarouselProps = {
  apps: appType[];
};

const AppCarousel: React.FC<AppCarouselProps> = ({ apps }) => {
  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", height: "100%" }} dir={"ltr"}>
      <Swiper
        spaceBetween={4}
        slidesPerView={1.5}
        breakpoints={{
          320: {
            slidesPerView: 2.2,
            spaceBetween: 5,
          },

          480: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3.2,
            spaceBetween: 15,
          },
          760: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
          940: {
            slidesPerView: 4.5,
            spaceBetween: 25,
          },
        }}
      >
        {apps.map((app, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ m: 1, borderRadius: 3 }}>
              <AppCard app={app} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AppCarousel;
