import { useState } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import "./styles/app.css";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="wrapper">
      <div className="left">
        {showLogin === true ? (
          <Login />
        ) : (
          <Register setShowLogin={setShowLogin} />
        )}
        {showLogin === true ? (
          <button onClick={() => setShowLogin(false)}>
            No account ? Sign up here.
          </button>
        ) : (
          <button onClick={() => setShowLogin(!showLogin)}>
            Already sign up ? Sign in here.
          </button>
        )}
      </div>
      <div className="right"></div>
    </div>
  );
}

export default App;
