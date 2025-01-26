import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { TokenProvider } from "./components/context/TokenContent.jsx"; // Import TokenProvider
import Layout from "./Layout.jsx";
import Report from "./components/Report/Report.jsx";
import Form2 from "./components/Form/Form2.jsx";
import LandingPage from "./components/Home/LandingPage.jsx";
import "./index.css";
import Explore from "./components/Home/Explore.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import FileUpload from "./components/Report/FileUpload.jsx";

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
        <Route path="fileupload" element={<FileUpload />} />
      </Route>
    )
  );

  return (
    <TokenProvider>
      {" "}
      {/* Wrap the entire app with TokenProvider */}
      <RouterProvider router={router} />
    </TokenProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
