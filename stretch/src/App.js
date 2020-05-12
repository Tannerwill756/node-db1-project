import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";

function App() {
  const [acct, setAcct] = useState([]);
  // console.log(acct);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/accounts")
      .then((res) => {
        // console.log(res.data.data);
        setAcct(res.data.data);
      })
      .catch((err) => {
        console.log("uh oh", err);
      });
  }, []);

  return (
    <div className="App">
      {acct.map((e) => (
        <div key={e.id}>
          <h2>Name: {e.name}</h2>
          <span>Budget: {e.budget}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
