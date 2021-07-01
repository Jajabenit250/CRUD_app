import { TextField } from "@material-ui/core";
import React from "react";

const Input = (props) => {
  const { id, name, type, label, value, onChange, ...other } = props;
  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      {...other}
    ></TextField>
  );
};

export default Input;
