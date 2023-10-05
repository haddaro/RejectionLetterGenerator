import { useState } from "react";
import Form from "./components/Form";
import { Input } from "./types/InputType";
import Header from "./components/Header";
import ResponseDisplay from "./components/ResponseDisplay";
import { Box, CircularProgress } from "@mui/material";

interface Advice {
  slip: {
    id: number;
    advice: string;
  };
  slip_id: number;
  advice: string;
}

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rejectionLetter, setRejectionLetter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (newData: Input) => {
    setIsSubmitted(true);
    const letter = await generateLetter(newData);
    setRejectionLetter(letter);
  };

  const getAdvice = async () => {
    setIsLoading(true);
    try {
      const answer = await fetch("https://api.adviceslip.com/advice");
      if (!answer.ok) throw new Error("Could not fetch advice");
      const fetchedAdvice: Advice = await answer.json();
      setIsLoading(false);
      return fetchedAdvice.slip.advice;
    } catch (error: unknown) {
      if (error instanceof Error) console.error(`error: ${error.message}`);
      else console.log(String(error));
      setIsLoading(false);
      return "Don't trust free Api's";
    }
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

  const generateLetter = async (data: Input) => {
    console.log(data.reInvite);
    const advice = await getAdvice();
    const evaluation = formatEvaluation(data.rate);
    return (
      `Dear ${data.candidate},
      We thank you for applying for a job at ${data.company}. 
      Although your interview demonstrated ${evaluation}, we have decided to move forward with another candidate. 
      We wish you best of luck in your job search` +
      (data.reInvite ? ", and hope you'll apply again in the future. " : ". ") +
      `In the meantime, here is a piece of advice: ${advice}
      Sincerely, ${data.company}.`
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
      <div>
        {isLoading && <CircularProgress />}
        {isSubmitted && typeof rejectionLetter === "string" && (
          <ResponseDisplay>{rejectionLetter}</ResponseDisplay>
        )}
      </div>
    </Box>
  );
}

export default App;
