import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
// import "https://mozilla.github.io/pdf.js/build/pdf.js";
// import "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.8.335/build/pdf.min.js";
// import "pdfjs-dist";
// import "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
