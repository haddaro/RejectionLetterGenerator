import { FormEvent, useRef, useState } from "react";
import {
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
  Fab,
} from "@mui/material";
import { Input } from "../types/InputType";
interface Props {
  onFormSubmit: (newData: Input) => void;
  moveForward: () => void;
}

const options: string[] = [
  "Almost hired",
  "Good but not enough",
  "They were okayish",
  "Pretty darn bad",
  "Sucked",
];
const inviteOptions: string[] = ["OK", "Hell no"];

const Form = ({ onFormSubmit, moveForward }: Props) => {
  const candidateRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLSelectElement>(null);
  const [invite, setInvite] = useState("");
  const [clicked, setClicked] = useState(false);

  const clearForm = () => {
    if (candidateRef.current) candidateRef.current.value = "";
    if (companyRef.current) companyRef.current.value = "";
    if (rateRef.current) rateRef.current.value = "";
    setInvite("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !candidateRef.current?.value ||
      !companyRef.current?.value ||
      !rateRef.current?.value ||
      !invite
    ) {
      return;
    }
    const candidate = candidateRef.current!.value;
    const company = companyRef.current!.value;
    const rate = rateRef.current!.value;
    const newData: Input = {
      candidate,
      company,
      rate,
      reInvite: invite === inviteOptions[0] ? true : false,
    };
    onFormSubmit(newData);
    setClicked(true);
  };

  const handleMoveForward = () => {
    clearForm();
    setClicked(false);
    moveForward();
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
          {clicked ? (
            <Fab
              type="submit"
              variant="extended"
              color="primary"
              onClick={handleMoveForward}
            >
              Move forward with another candidate
            </Fab>
          ) : (
            <Fab type="submit" variant="extended" color="primary">
              Generate
            </Fab>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
