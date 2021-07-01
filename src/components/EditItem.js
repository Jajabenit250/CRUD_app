import { Button, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { Form, useForm } from "./UseForm";
import Controls from "./controls/Controls";
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
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Form className={classes.form} autComplete="off" onSubmit={saveItem}>
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
            <Button
              className={classes.btnSave}
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </center>
        </Form>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
  },
  btnSave: {
    margin: theme.spacing(2),
  },
  paper: {
    width: "100%",
    padding: theme.spacing(1),
    justifyContent: "center",
  },
}));

export default AddItem;
