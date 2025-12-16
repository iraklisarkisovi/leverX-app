import React, { useState } from 'react'
import { IDataUsers } from '../types/types';
import { Link } from 'react-router-dom';
import remoteicon from "../assets/remoteicon.png";
import avatarplaceholder from "../assets/users/userpicture.png";
import buildingicon from "../assets/departmenticon.png";
import roomicon from "../assets/roomicon.png";
import gridicon from "../assets/gridicon.png";
export interface UsercardProps {
  data: IDataUsers;
}


const Usercard: React.FC<UsercardProps> = ({data}) => {
  const [isgrid, setIsgrid] = useState<boolean>(false)
  
  const gridlayout = () => {
    setIsgrid((prev) => !prev)
  }

  return (
    <>
      <div className="employeescontainer">
        <div className="employeecontainerheader">
          <div className="employeecount">
            <h3>
              {data.length} {data.length !== 1 ? "Employees" : "Employee"}{" "}
              displayed
            </h3>
          </div>
          <button id="gridbutton" onClick={() => gridlayout()}>
            <img
              className="gridicon"
              width="30px"
              height="30px"
              src={gridicon}
              alt="grid/col"
            />
          </button>
        </div>

        <div
          className={isgrid ? "employeewrapper grid" : "employeewrapper list"}
        >
          {data.map((user) => (
            <div
              className={
                isgrid ? "employeecontainer grid" : "employeecontainer list"
              }
              key={user._id}
            >
              <Link to={`/user/${user._id}`} className="htmlto">
                <div className="profilecontainer">
                  <div className="profileimage">
                    <img
                      src={user.user_avatar || avatarplaceholder}
                      width="150px"
                      className="avatar"
                      height="150px"
                      alt="avatar"
                    />
                    {user.isRemoteWork && (
                      <img src={remoteicon} className="remote" alt="remote" />
                    )}
                  </div>
                  <h3>{user.first_name + " " + user.last_name}</h3>
                </div>
              </Link>
              <div className="subinfocontainer">
                <hr className="divider" />
                <div className="subinfocontainerchild">
                  <div className="subinfo">
                    <img
                      src={buildingicon}
                      width="20px"
                      height="auto"
                      alt="buildingicon"
                    />
                    <strong>{user.department}</strong>
                  </div>
                  <div className="subinfo">
                    <img
                      src={roomicon}
                      width="20px"
                      height="auto"
                      alt="roomicon"
                    />
                    <strong>{user.room}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Usercard
