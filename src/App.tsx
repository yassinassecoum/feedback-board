import { useState } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="wrapper">
      <div className="wrapBox">
        <div className="boxForm">
          {showLogin === true ? (
            <Login />
          ) : (
            <Register setShowLogin={setShowLogin} />
          )}
          {showLogin === true ? (
            <span className="switchLogin">
              Dont have an account ?
              <strong onClick={() => setShowLogin(false)}> Sign up </strong>
              here.
            </span>
          ) : (
            <span className="switchLogin">
              Have an Account ?
              <strong onClick={() => setShowLogin(!showLogin)}> Sign in</strong>
              here.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
