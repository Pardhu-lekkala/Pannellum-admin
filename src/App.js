import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/register";
import Login from "./Pages/Login";
import ConfirmPassword from "./Pages/setPassword";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/forgotpassword";
import CreateProject from "./Pages/CreateProject";
import CustomLogin from "./Pages/CustomLoginPage";
import ProjectDetails from "./Components/DetailsCard";
import CreateNewPage from "./Pages/CreateNewPage";
import AddPage from "./Pages/AddPage";
import ProjectDetailsData from "./Pages/ViewDetails";
import PreviewPage from "./Pages/Preview";

import AddMarker from "./Components/AddMarker";
import AddVideoArea from "./Components/AddVideoArea";
import VideoPlayer from "./Components/VideoPlayer";
import DrawRectangle from "./Components/DrawRectangle";
import UseQuery from "./Components/UseQuery";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/signUp"} component={SignUp} />
          <Route exact path={"/home"} component={Home} />
          <Route exact path={"/createproject"} component={CreateProject} />
          <Route exact path={"/forgotpassword"} component={ForgotPassword} />
          <Route exact path={"/customlogin"} component={CustomLogin} />
          <Route exact path={"/projectdetails"} component={ProjectDetails} />
          <Route exact path={"/setPassword"} component={ConfirmPassword} />
          <Route exact path={"/newpage"} component={CreateNewPage} />
          <Route exact path={"/addpage"} component={AddPage} />
          <Route
            exact
            path={"/projectdetailsdata"}
            component={ProjectDetailsData}
          />
          <Route exact path={"/p"} component={ProjectDetailsData} />
          <Route exact path={"/markerlocation"} component={AddMarker} />
          <Route exact path={"/videoarea"} component={AddVideoArea} />
          <Route exact path={"/query"} component={UseQuery} />
          <Route exact path={"/videoplayer"} component={VideoPlayer} />
          <Route exact path={"/drawshape"} component={DrawRectangle} />
          <Route exact path={"/preview"} component={PreviewPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
