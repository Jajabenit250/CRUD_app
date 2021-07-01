import { makeStyles } from "@material-ui/core";
import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import { classes } from "istanbul-lib-coverage";
const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  label: {
    textTransform: "none",
  },
}));
const Button = (props) => {
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
