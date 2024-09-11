import { useState } from "react";

function App() {
  const [toDo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);

  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    // toDo가 비어 있다면 함수가 작동하지 않도록 함
    if (toDo == "") {
      return;
    }

    // currentArray를 받아오고 새로운 array를 추가해줌
    // [(array), ...(other array)]: array 내에 새로운 요소를 추가
    setTodos((currentArray) => [toDo, ...currentArray]);

    // input 창을 비워줌
    setTodo("");
  };

  // map 함수에서 첫번째 인자는 배열 내의 각 요소를 의미함
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input 
          onChange={onChange} 
          value={toDo} 
          text="Text" 
          placeholder="Write your to do" 
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>))}
      </ul>
    </div>
  );
}

export default App;
