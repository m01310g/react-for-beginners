import styles from "./App.module.css"
import { useState, useEffect } from "react";

// useEffect의 첫번째 인자: 한 번만 실행시키고 싶은 코드
// 두번째 인자: deps(대괄호([]) 내에 있는 변수가 변할 때 코드 실행)
function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () =>  setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  useEffect(() => {    // 오직 한 번만 실행
    console.log("CALL THE API...");
  }, []);
  useEffect(() => {
    console.log("I run when 'keyword' changes");
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes");
  }, [counter]);
  useEffect(() => {
    console.log("I run when keyword & counter changes");
  }, [keyword, counter]);

  return (
    <div>
      <input 
        value={keyword}
        onChange={onChange} 
        type="text" 
        placeholder="Search here" 
      />
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
