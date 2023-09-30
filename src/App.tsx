import { useState } from "react";
import Form from "./components/Form";
import { Input } from "./types/InputType";

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
        <div>
          name: {data.candidate} company: {data.company} rate: {data.rate}
          {data.reInvite ? (
            <div>invited again</div>
          ) : (
            <div>not invited again</div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
