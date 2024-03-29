import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Button, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link } from "react-router-dom";

const Filter = () => {
  return (
    <Box
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.3,
        zIndex: 1,
        width: "100%",
        height: "100%",
        background: "linear-gradient(-180deg, black, gray)",
      }}
    />
  );
};

const Media = ({ source }) => {
  return (
    <video
      width={"100%"}
      preload="true"
      muted={true}
      autoPlay={true}
      loop={true}
      playsInline={true}
      src={source}
      data-delay-time="28000"
      // style={{ borderRadius: "10px" }}
    />
  );
};

function Slider() {
  const randomStart = Math.floor(Math.random() * 3);
  const [index, setIndex] = useState(randomStart);

  return (
    <Box // to hide slider on small screen
      sx={{
        display: { xs: "none", sm: "block", md: "block" },
        // p: 2,
      }}>
      <div // hidden overflow video
        style={{
          maxHeight: "90vh",
          // width: "calc(150px + 70vw)",
          width: "100%",
          overflow: "hidden",
          margin: "0px auto",
          // borderRadius: "10px",
        }}>
        <Carousel
          navButtonsAlwaysVisible={true}
          index={index}
          next={(next, active) => {
            setIndex(next);
          }}
          prev={(prev, active) => {
            setIndex(prev);
          }}
          interval={10000}
          indicators={false}
          fullHeightHover={false}
          stopAutoPlayOnHover={false}
          duration={1000}
          NextIcon={<NavigateNextIcon />}
          PrevIcon={<NavigateBeforeIcon />}>
          <Box sx={{ position: "relative" }}>
            <Filter />
            <Media source="videos/pexels-harry-cooke-6805354-1920x1080-30fps.mp4" />
            <Stack
              sx={{
                position: "absolute",
                top: "5%",
                right: "5%",
                zIndex: 1,
                color: "#fff",
                width: "30%",
              }}>
              <Typography
                variant="h3"
                sx={{ color: "#fff", fontWeight: "bold" }}>
                {`Stay Warm in Style`.toUpperCase()}
              </Typography>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                {`Shop Our Latest Collection of Coats`}
              </Typography>
              <Box my={1}>
                <Link
                  to="/product/category/All"
                  style={{ textDecoration: "none" }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ minHeight: 0, minWidth: 0 }}>
                    Browse Products
                  </Button>
                </Link>
                <Button
                  size="small"
                  target="_blank"
                  href="https://www.pexels.com/video/female-model-posing-6805354/"
                  sx={{
                    textTransform: "none",
                    color: "white",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                  }}>
                  Credits: Media By Harry Cooke
                </Button>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Filter />
            <Media source="videos/pexels-cottonbro-studio-7872920-4096x2160-25fps.mp4" />
            <Stack
              sx={{
                position: "absolute",
                bottom: "15%",
                right: "5%",
                zIndex: 1,
                color: "#fff",
                width: "30%",
              }}>
              <Typography
                variant="h3"
                sx={{ color: "#fff", fontWeight: "bold" }}>
                {`Men's Apparel`.toUpperCase()}
              </Typography>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                {`Experience Style and Comfort with Every Wear`}
              </Typography>
              <Box my={1}>
                <Link
                  to="/product/category/Men"
                  style={{ textDecoration: "none" }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ minHeight: 0, minWidth: 0 }}>
                    BROWSE MEN'S WEAR
                  </Button>
                </Link>
                <Button
                  size="small"
                  target="_blank"
                  href="https://www.pexels.com/video/people-wearing-pastel-color-clothes-7872920/"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                  }}>
                  Credits: Media By Cottonbro Studio
                </Button>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Filter />
            <Media source="videos/pexels-ba-tik-3753687-1920x1080-50fps.mp4" />
            <Stack
              sx={{
                position: "absolute",
                bottom: "15%",
                left: "5%",
                zIndex: 1,
                color: "#fff",
                width: "30%",
              }}>
              <Typography
                variant="h3"
                sx={{ color: "#fff", fontWeight: "bold" }}>
                {`Women's Fashion`.toUpperCase()}
              </Typography>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                {`Upgrade Your Wardrobe with Our Stylish Blazer Collection`}
              </Typography>
              <Box my={1}>
                <Link
                  to="/product/category/Women"
                  style={{ textDecoration: "none" }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ minHeight: 0, minWidth: 0 }}>
                    BROWSE WOMEN'S WEAR
                  </Button>
                </Link>
                <Button
                  size="small"
                  target="_blank"
                  href="https://www.pexels.com/video/model-wearing-a-white-top-3753687/"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                  }}>
                  Credits: Media By Ba Tik
                </Button>
              </Box>
            </Stack>
          </Box>
        </Carousel>
      </div>
    </Box>
  );
}

export default Slider;
