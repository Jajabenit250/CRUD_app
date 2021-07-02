import {
  Container,
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";

import ItemList from "./components/ItemList";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1634f5",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});
const useStyles = makeStyles((theme) => ({
  appMain: {
    padding: theme.spacing(0.5),
    marginTop: "1em",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Container className={classes.appMain} component="main">
        <Switch>
          <Route exact path="/" component={ItemList} />
          <Route exact path="/add" component={AddItem} />
          <Route exact path="/edit:id" component={EditItem} />
        </Switch>
      </Container>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
