// v6 이후로 Switch 대신 Routes 사용, Routes 내부에는 자식으로 Route만 가능
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./js/routes/Home";
import Detail from "./js/routes/Detail";

// Router을 이용해서 url 변경시 페이지 이동
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={
          <h1>Hello</h1>
        } />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;