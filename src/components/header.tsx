import '../styles/header.scss'
import logoutIcon from "../assets/logouticon.png";
import supporticon from "../assets/supporticon.png";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IDataUsers, IUser } from '../types/types';
import avatarplaceholder from "../assets/users/userpicture.png";
import { useGetUsersQuery } from '../redux/store/api';
import menuicon from '../assets/menuiconwhite.png'
import Xmenuicon from "../assets/menuclosedicon.png";

const Header = () => {
  const [user, setUser] = useState<IDataUsers>([]);
  const {data} = useGetUsersQuery();
  const currentuserid = localStorage.getItem("userId") || sessionStorage.getItem("userId")
  const currentuserrole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const navigate = useNavigate()

  const [isopen, setIsopen] = useState<boolean>(false)

  const getuser = async () => {
    const IsData = data === undefined ? [] : data
    const user = IsData.filter((prev: IUser) => prev._id === currentuserid);
    setUser(user);
  }

  useEffect(() => {
    getuser()
  }, [data])

  const HandleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/signin')
  }
  
  return (
    <>
      <div className="mainheader">
        <div className="headermobile">
          <Link to="/">
            <div className="logo">
              <p>LEVERX</p>
              <h3>EMPLOYEE SERVICES</h3>
            </div>
          </Link>
          <label htmlFor="headercheckbox" id="menuimage"></label>
        </div>
        <div className="MenuDiv">
          <button
            className="toggleMenu"
            onClick={() => setIsopen((prev) => !prev)}
          >
            <img
              src={isopen ? Xmenuicon : menuicon}
              width={"40px"}
              alt="burgermenu"
            />
          </button>
        </div>
        <div className={isopen ? "mobiledesign open" : "mobiledesign"}>
          <div className="categorycontainer">
            <hr className="stripe" />
            <Link to="/" className="categorylink">
              Address Book
            </Link>
            {currentuserrole === "admin" ? (
              <Link to="/admin" className="categorylink">
                Settings
              </Link>
            ) : (
              ""
            )}
            <hr className="stripe" />
          </div>

          <div className="headerbuttoncontainer">
            <button
              className={isopen ? "headerbutton" : "headerbutton open"}
              id={"supportbutton"}
            >
              <img src={supporticon} width="20px" alt="support" />
              SUPPORT
            </button>

            {user?.map(({ first_name, last_name, user_avatar }) => (
              <Link
                key={first_name}
                to={`/user/${currentuserid}`}
                className="headerbutton"
                id="profile"
              >
                <img
                  src={user_avatar || avatarplaceholder}
                  width="25px"
                  className="avatar"
                  alt="avatar"
                />
                  {first_name} {last_name}
              </Link>
            ))}
            <button
              className="headerbutton round"
              id="logout"
              onClick={() => HandleLogout()}
            >
              <img
                src={logoutIcon}
                width="20px"
                className="logouticon"
                alt="logout"
              />
              <div className="logouttext">
                <hr />
                <h2>Log out</h2>
                <hr />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header
