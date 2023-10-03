import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #B0BEC5 30%, #2196F3 90%)",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        padding: "16px",
      }}
    >
      <Typography
        variant="h3"
        color="white"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        R-eject! 📃➡️🗑️
      </Typography>
    </Box>
  );
};

export default Header;
