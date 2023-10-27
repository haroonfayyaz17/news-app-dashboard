import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, Component }, idx) => (
            <Route
              key={`__route__${idx}`}
              path={path}
              element={<Component />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
