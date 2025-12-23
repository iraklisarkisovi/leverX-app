import { useState } from "react";
import "../styles/signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../redux/store/api";
import { Alert, LinearProgress } from "@mui/material";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [Signin, {isLoading, isError}] = useSignInMutation();

  const navigate = useNavigate();

  const Login = async () => {
    try {
      const { id, role } = await Signin({
        password,
        email,
      }).unwrap();

      if (remember) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("userId", id);
        localStorage.setItem("userRole", role);
      } else {
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("userId", id);
        sessionStorage.setItem("userRole", role);
      }

      navigate("/");
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <div className="mainsignupcontainer">
        <h1>Sign in form</h1>

        <form
          className="signupinputcontainer"
          onSubmit={(e) => {
            e.preventDefault(), Login();
          }}
        >
          <div className="inputbox">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="signupinput"
              value={email}
            />
          </div>
          <div className="inputbox">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="signupinput"
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPass(e.target.value)
              }
              value={password}
              required
            />
          </div>
          <div className="inputbox">
            <div className="optionbox">
              <div>
                <label htmlFor="checkbox">Remember me</label>
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRemember(e.target.checked)
                  }
                />
              </div>
              <Link to={"/signup"}>Sign Up</Link>
            </div>
          </div>
          <button className="submitbutton" type="submit">
            {isLoading ? <LinearProgress color="inherit" /> : "Sign In"}
          </button>
          {isError && (
            <Alert severity="error">
              Invalid credentials! please input valid email and password
            </Alert>
          )}
        </form>
      </div>
    </>
  );
};

export default Signin;
