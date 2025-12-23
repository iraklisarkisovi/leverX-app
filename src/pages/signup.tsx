import { useState } from "react";
import "../styles/signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/store/api";
import { LinearProgress } from "@mui/material";

const Signup = () => {
  const [first_name, setName] = useState<string>("");
  const [last_name, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const navigate = useNavigate();
  const [signup, { isLoading, isError }] = useSignupMutation();

  const SignIn = async () => {
    try {
      const res = await signup({
        first_name,
        last_name,
        email,
        password,
      }).unwrap();
      sessionStorage.setItem("auth", "true");
      sessionStorage.setItem("userId", res.userWithoutPass._id);
      sessionStorage.setItem("userRole", res.userWithoutPass.role);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mainsignupcontainer">
        <h1>Sign up Form</h1>
        <form
          className="signupinputcontainer"
          onSubmit={(e) => {
            e.preventDefault(), SignIn();
          }}
        >
          <div className="inputbox">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              className="signupinput"
              value={first_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          <div className="inputbox">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              className="signupinput"
              value={last_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastname(e.target.value)
              }
            />
          </div>
          <div className="inputbox">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="signupinput"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="inputbox">
            <p>{isError && "invalid credentials"}</p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="signupinput"
              name="email"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPass(e.target.value)
              }
              required
            />
          </div>
          <div>
            <Link to="/signin">Sign In</Link>
          </div>
          <button className="submitbutton" type="submit">
            {isLoading ? <LinearProgress color="inherit" /> : "Sign Up"}
          </button>
          <p className="alerterr">
            {isError &&
              "User on this Email is already created please register valid Email."}
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
