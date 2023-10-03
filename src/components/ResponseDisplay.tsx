import { IconButton, Box, Paper, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

interface Props {
  children: string;
}

const ResponseDisplay = ({ children }: Props) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    );
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
          {error && (
            <>
              <Typography variant="body2">Could not copy</Typography>
              <ErrorIcon />
            </>
          )}
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
