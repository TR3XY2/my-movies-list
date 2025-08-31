import React from "react";
import ReactDOM from "react-dom/client";
import './styles/index.css';
import App from './components/App';

// import StarRating from "./components/UI/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {<App />}
    {/* <StarRating messages={["t", "b", "o", "g", "a"]} defaultRating={3}/>
    <StarRating size={24} color="red" /> */}
  </React.StrictMode>
);