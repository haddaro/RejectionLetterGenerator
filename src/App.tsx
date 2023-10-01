import { useState } from "react";
import Form from "./components/Form";
import { Input } from "./types/InputType";
import Header from "./components/Header";
import ResponseDisplay from "./components/responseDisplay";
import { Box } from "@mui/material";

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

  const generatePrompt = (data: Input) => {
    return (
      `Write a rejection letter to ${data.candidate} who applied for a job at ${data.company}. The hiring team's evaluation of ${data.candidate} was: ${data.rate}.
        The candidate is ` +
      (data.reInvite
        ? "invited to try again in the future."
        : "not invited again to apply for more jobs in our company.")
    );
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #ecf0f1 30%, #bdc3c7 90%)",
        borderRadius: "15px",
      }}
    >
      <Header />
      <div style={{ marginTop: "50px", padding: "16px" }}>
        <Form onFormSubmit={handleFormSubmit} />
      </div>
      {isSubmitted && <ResponseDisplay toDisplay={generatePrompt(data)} />}
    </Box>
  );
}

export default App;
