import { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/admin.scss"
import { IDataUsers, IUser } from "../types/types";
import avatarplaceholder from "../assets/users/userpicture.png";
import { Link } from "react-router-dom";
import { useGetUsersQuery, useUpdateuserstatusMutation } from "../redux/store/api";
import Progress from "../UI components/circularprogress";

const adressbook = ["Employee", "HR"];
const vacation = ["Employee", "PO", "DD"];

const Admin = () => {
  const [users, setUsers] = useState<IDataUsers>([])
  const [searchusers, setSearchusers] = useState<IDataUsers>([]);
  const { data, isLoading } = useGetUsersQuery();
  const [UpdateStatus] = useUpdateuserstatusMutation();

  const currentuserid = localStorage.getItem("userId") || sessionStorage.getItem("userId")

  const GetUsers = async () => {
    const IsData = data === undefined ? [] : data;
    const filteradmin = IsData.filter(
      (user: IUser) => user._id !== currentuserid
    );
    setUsers(filteradmin);
    setSearchusers(filteradmin)
  }

  const HandleSearch = (e: string) => {
    const filteredusers = users.filter((user) => 
      user.first_name.toLocaleLowerCase().includes(e.toLowerCase()) ||
      user.last_name.toLocaleLowerCase().includes(e.toLowerCase()))

    const IsData = filteredusers ? filteredusers : users;
    
    setSearchusers(IsData);
  }

  const HandleRoleChange = async (newrole: string, id: string) => {
    await UpdateStatus({newrole: newrole, userId: id});

    setSearchusers((prev) =>
      prev.map((user) => (user._id === id ? { ...user, role: newrole } : user))
    );

  }

  useEffect(() => {
    GetUsers()
  }, [data])

  return (
    <>
      {isLoading ? <Progress/> :
      <><Header /><div className="mainadmincontainer">
        <div className="userscontainer">
          <div className="headercontainer">
            <h3>ROLES & PERMISSIONS</h3>
          </div>
          <hr />
          <div className="searchuserscontainer">
            <div className="headerdiv">
              <div className="contentheader">
                <input
                  type="text"
                  placeholder="John Smith"
                  className="searchinput"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => HandleSearch(e.target.value)} />
                <h4 className="headertext">Address book role</h4>
                <h4 className="headertext">Vacation role</h4>
              </div>
              <h4 className="headertext">Admin</h4>
            </div>
            <div className="usersdiv">
              {searchusers?.map((user) => (
                <div className="userinfo" key={user._id}>
                  <div className="avatarcontainer">
                    <img
                      src={user.user_avatar || avatarplaceholder}
                      alt="usersavatar"
                      width="100px"
                      className="avatar" />
                    <Link to={`/user/${user._id}`}>
                      {user.first_name} {user.last_name} /{" "}
                      {user.first_native_name} {user.last_native_name}
                    </Link>
                  </div>
                  <div className="buttoncontainer" id="addressbook">
                    {adressbook.map((role) => (
                      <button
                        onClick={() => HandleRoleChange(role, user._id)}
                        className={role.toLowerCase() === user.role?.toLowerCase()
                          ? "rolebutton checked"
                          : "rolebutton"}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  <div className="buttoncontainer" id="vacation">
                    {vacation.map((role) => (
                      <button
                        onClick={() => HandleRoleChange(role, user._id)}
                        className={role.toLowerCase() === user.role?.toLowerCase()
                          ? "rolebutton checked"
                          : "rolebutton"}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  <div className="buttoncontainer" id="admin">
                    <button
                      onClick={() => HandleRoleChange("admin", user._id)}
                      className={user.role === "admin"
                        ? "rolebutton checked"
                        : "rolebutton"}
                    >
                      Admin
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div></>
}    </>
  );
}

export default Admin
