import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SubjectPicker from "./components/SubjectPicker";
import AddCard from "./views/AddCard";
import ListCards from "./views/ListCards";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <SubjectPicker />
          </div>
        </Route>
        <Route path="/add">
          <AddCard />
        </Route>
        <Route path="/list/:subjectId">
          <ListCards />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
