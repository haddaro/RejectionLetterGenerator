import { useState } from "react";
import Form from "./components/Form";
import { Input } from "./types/InputType";
import { Box, Paper, Typography } from "@mui/material";

function App() {
  const [data, setData] = useState<Input>({
    candidate: "",
    company: "",
    rate: "",
    reInvite: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (newData: Input) => {
    setData(newData);
    setIsSubmitted(true);
  };

  return (
    <>
      <Form onFormSubmit={handleFormSubmit} />
      {isSubmitted && (
        <Paper style={{ marginTop: "50px", padding: "16px" }} elevation={6}>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              name: {data.candidate} company: {data.company} rate: {data.rate}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {data.reInvite ? (
                <div>invited again</div>
              ) : (
                <div>not invited again</div>
              )}
            </Typography>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default App;
