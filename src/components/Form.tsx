import { FormEvent, useState } from "react";
import { Input } from "../types/inputType";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
} from "@mui/material";

const options: string[] = [
  "Almost hired",
  "Good but not enough",
  "They were okayish",
  "Pretty darn bad",
  "Sucked",
];
const inviteOptions: string[] = ["OK", "Hell no"];

const Form = () => {
  const [candidateName, setCandidateName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [invite, setInvite] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!candidateName || !companyName || evaluation === undefined) return;

    const newInput: Input = {
      candidate: candidateName,
      company: companyName,
      rate: evaluation,
      reInvite: invite === inviteOptions[0] ? true : false,
    };
    setCandidateName("");
    setCompanyName("");
    setEvaluation("");
    console.log(newInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Candidate's name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            variant="standard"
            margin="normal"
            style={{ width: "90%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company's name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="company"
            variant="standard"
            margin="normal"
            style={{ width: "90%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="standard"
            margin="normal"
            style={{ width: "90%" }}
          >
            <InputLabel
              id="evaluation-label"
              shrink={evaluation ? true : false}
            >
              {evaluation ? "" : "How bad were they?"}
            </InputLabel>
            <Select
              labelId="evaluation-label"
              value={evaluation}
              onChange={(e) => setEvaluation(e.target.value)}
            >
              {options.map((option, index) => (
                <MenuItem value={option} key={index}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel id="re-invite">
              Have them try again in the future?
            </FormLabel>
            <RadioGroup
              aria-labelledby="re-invite"
              name="invite response group"
              value={invite}
              onChange={(e) => setInvite(e.target.value)}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={inviteOptions[0]}
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={inviteOptions[1]}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" color="primary">
            Generate
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
