import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        
      <App />
      </LocalizationProvider>
    </ApolloProvider>
  </React.StrictMode>
);


