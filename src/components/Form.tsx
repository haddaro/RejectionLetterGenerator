import { FormEvent, useRef, useState } from "react";
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
import { Input } from "../types/InputType";
interface Props {
  onFormSubmit: (newData: Input) => void;
}

const options: string[] = [
  "Almost hired",
  "Good but not enough",
  "They were okayish",
  "Pretty darn bad",
  "Sucked",
];
const inviteOptions: string[] = ["OK", "Hell no"];

const Form = ({ onFormSubmit }: Props) => {
  const candidateRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLSelectElement>(null);
  const [invite, setInvite] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const candidate = candidateRef.current?.value || "";
    const company = companyRef.current?.value || "";
    const rate = rateRef.current?.value || "";
    const newData: Input = {
      candidate,
      company,
      rate,
      reInvite: invite === inviteOptions[0] ? true : false,
    };
    onFormSubmit(newData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Candidate's name"
            inputRef={candidateRef}
            variant="standard"
            margin="normal"
            style={{ width: "90%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company's name"
            inputRef={companyRef}
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
            <InputLabel id="evaluation-label">How bad were they?</InputLabel>
            <Select labelId="evaluation-label" inputRef={rateRef}>
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
