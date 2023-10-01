import { IconButton, Box, Paper, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

interface Props {
  children: string;
}

const ResponseDisplay = ({ children }: Props) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    //write functionality!!!!!
  };
  return (
    <Paper
      style={{ marginTop: "50px", padding: "16px", position: "relative" }}
      elevation={6}
    >
      <Tooltip title="Copy to clipboard">
        <IconButton
          onClick={handleCopy}
          disabled={copied}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
          }}
        >
          {copied ? (
            <>
              <Typography variant="body2">Copied!</Typography>
              <CheckIcon />
            </>
          ) : (
            <ContentCopyIcon />
          )}
        </IconButton>
      </Tooltip>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          {children}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ResponseDisplay;
