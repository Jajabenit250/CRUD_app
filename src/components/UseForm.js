import { makeStyles } from "@material-ui/core";
import React from "react";
import { useState } from "react";

export function useForm(initialState) {
  const [data, setData] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImmediate({
      ...data,
      [name]: value,
    });
  };

  return {
    data,
    setData,
    handleInputChange,
  };
}

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form className={classes.root} method="POST" {...other}>
      {props.children}
    </form>
  );
}

const useStyles = makeStyles((theme) => {});
