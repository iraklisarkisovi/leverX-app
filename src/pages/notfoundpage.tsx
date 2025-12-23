import { Link } from "react-router-dom";
import notfoundrobot from "../assets/notfound.png";
import "../styles/notfoundstyle.scss";

const Notfoundpage = () => {
  return (
    <div className="notfoundmaincontainer">
      <img src={notfoundrobot} alt="" />
      <h1>404 Page not found</h1>
      <p>
        Sorry, we can't find that page! it might be an old link or maybe it was
        removed
      </p>
      <Link className="Back" to={"/"}>
        GO TO THE MAIN PAGE
      </Link>
    </div>
  );
};

export default Notfoundpage;
