import { func } from "prop-types";
import styles from "./App.module.css"
import { useState, useEffect } from "react";

function Hello() {
  function byeFn() {
    console.log("bye :(")
  }
  
  function hiFn() {
    console.log("created :)");
    return byeFn;
  }

  // Cleanup function: component가 destroy 될 때 실행되도록 할 수 있음
  useEffect(hiFn, [])
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
