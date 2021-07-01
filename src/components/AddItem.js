import { Button, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Form, useForm } from "./UseForm";
import Controls from "./controls/Controls";
import Popup from "./Popup";
const AddItem = () => {
  const initialState = {
    userId: "",
    id: "",
    title: "",
    body: "",
  };
  const { data, setData, handleInputChange } = useForm(initialState);
  const saveItem = (e) => {
    e.preventDefault();
  };

  return (
    <Paper>
      <Form onSubmit={saveItem}>
        <Grid container display="flex">
          <Grid item sm={true} display="flex">
            <Controls.Input
              id="userId"
              name="userId"
              type="number"
              label="USER ID"
              value={data.userId}
              onChange={handleInputChange}
            />

            <Controls.Input
              id="id"
              name="id"
              type="number"
              label="ID"
              value={data.id}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item sm={true} />
          <Grid item sm={true}>
            <Controls.Input
              id="title"
              name="title"
              type="number"
              label="TITLE"
              value={data.title}
              onChange={handleInputChange}
            />

            <Controls.Input
              id="body"
              name="body"
              type="number"
              label="BODY"
              value={data.body}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <center>
          <Controls.Button
            text="Save"
            type="submit"
            variant="contained"
            color="primary"
          />
        </center>
      </Form>
    </Paper>
  );
};

export default AddItem;
