import { useState } from "react";
import "../styles/signup.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from "../redux/store/api";


const Signup = () => {
  const [first_name, setName] = useState<string>('')
  const [last_name, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>('');
  const [password, setPass] = useState<string>("");
  const navigate = useNavigate()
  const [signup] = useSignupMutation();

  const SignIn = async () => {
    try{
      const res = await signup({ first_name, last_name, email, password }).unwrap();
      sessionStorage.setItem("auth", "true");
      sessionStorage.setItem("userId",  res.userWithoutPass._id);
      sessionStorage.setItem("userRole", res.userWithoutPass.role);

      navigate("/")
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="mainsignupcontainer">
        <h1>Sign up Form</h1>
        <div className="signupinputcontainer">
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)}
            />
          </div>
          <div className="inputbox">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="signupinput"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputbox">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="signupinput"
              name="email"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
              required
            />
          </div>
          <div>
            <Link to="/signin">Sign In</Link>
          </div>
          <button className="submitbutton" onClick={() => SignIn()}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
