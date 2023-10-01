import { useState } from "react";
import Form from "./components/Form";
import { Input } from "./types/InputType";
import Header from "./components/Header";
import ResponseDisplay from "./components/ResponseDisplay";
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

  const formatEvaluation = (rate: string) => {
    if (rate === "Almost hired")
      return `a performance that nearly secured you the position`;
    if (rate === "Good but not enough") return `a good effort`;
    if (rate === "They were okayish")
      return `a satisfactory level of competence`;
    if (rate === "Pretty darn bad") return `laudable soft skills`;
    if (rate === "Sucked") return `an incredibly high self esteem`;
  };
  const generateLetter = (data: Input) => {
    const evaluation = formatEvaluation(data.rate);
    return (
      `Dear ${data.candidate},
      We thank you for applying for a job at ${data.company}. 
      Although your interview demonstrated ${evaluation},  
      we have decided to move forward with another candidate. 
      We wish you best of luck in your job search` +
      (data.reInvite ? ", and hope you'll apply again in the future. " : ". ") +
      `Sincerely, ${data.company}.`
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
        <Form
          onFormSubmit={handleFormSubmit}
          moveForward={() => {
            setIsSubmitted(false);
          }}
        />
      </div>
      {isSubmitted && <ResponseDisplay>{generateLetter(data)}</ResponseDisplay>}
    </Box>
  );
}

export default App;
