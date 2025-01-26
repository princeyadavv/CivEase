import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
// import Home from "./components/Home/Explore.jsx";
import Report from "./components/Report/Report.jsx";
import Form2 from "./components/Form/Form2.jsx";
import LandingPage from "./components/Home/LandingPage.jsx";
import "./index.css";
import Explore from "./components/Home/Explore.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";

const App = () => {
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);

  const handleGetStarted = () => {
    setShowHeaderFooter(true);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout showHeaderFooter={showHeaderFooter} />}>
        <Route
          path=""
          element={<LandingPage onGetStarted={handleGetStarted} />}
        />
        <Route path="explore" element={<Explore />} />
        <Route path="report" element={<Report />} />
        <Route path="form2" element={<Form2 />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
