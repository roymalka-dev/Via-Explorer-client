import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

/**
 * Component Props
 * @typedef {Object} ImageCarouselProps
 * @property {string[]} images - Array of image URLs
 */
type ImageCarouselProps = {
  images: string[]; // Array of image URLs
};

/**
 * Image Carousel component that displays a carousel of images using Swiper and allows
 * users to view a selected image in a modal.
 * @param {ImageCarouselProps} props - Component props
 * @returns {JSX.Element} ImageCarousel component
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  /**
   * Opens the modal and sets the selected image.
   * @param {string} image - Selected image URL
   */
  const handleOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ m: 1, borderRadius: 3, overflow: "hidden" }}>
              <img
                src={image}
                alt={""}
                style={{ width: "100%", height: "auto", cursor: "pointer" }}
                onClick={() => handleOpen(image)}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", height: "auto", maxWidth: "600px" }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageCarousel;
