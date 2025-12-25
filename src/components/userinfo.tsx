import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import remoteicon from "../assets/remoteicon.png";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { GetUserState, HandleEdit } from '../redux/userslice';

const currentuserid =
  localStorage.getItem("userId") || sessionStorage.getItem("userId");

const Userinfo: React.FC = () => {
    const {userData, updatedUserData} = useSelector(
    (state: RootState) => state.UserSlice
  );
  const [role, setRole] = useState<string | null>('')
  const dispatch = useDispatch()
  
  useEffect(() => {
    const currentuserrole =
      localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
    setRole(currentuserrole)
  }, [])
  useEffect(() => {
    if (updatedUserData && updatedUserData._id === userData._id) {
      dispatch(GetUserState(updatedUserData));
    } else {
      dispatch(GetUserState(userData));
    }
  }, [updatedUserData, userData]);

  const {
    visa,
    building,
    citizenship,
    cnumber,
    date_birth,
    department,
    desk_number,
    email,
    first_name,
    first_native_name,
    isRemoteWork,
    last_name,
    last_native_name,
    manager,
    middle_native_name,
    phone,
    room,
    user_avatar,
    skype,
    _id,
  } = userData;
  console.log(visa, email, first_name)
  return (
    <>
      <div id="userdetail" key={_id}>
        <div className="profilepagewrapper">
          <div className="sectioncontentSidebarSection">
            <Link to="/" className="sectioncontentBackArrowIcon">
              🡠
            </Link>
            <div className="sectioncontentProfilePictureContainer">
              <div className="profileimage">
                <img
                  src={user_avatar || "/assets/users/userpicture.png"}
                  alt="Luffy Monkey"
                  className="sectioncontentProfilePictureContent"
                />
                {isRemoteWork && (
                  <img src={remoteicon} className="remote" alt="remoteicon" />
                )}
              </div>
            </div>
            <div className="namecontainer">
              <h4
                className="sectioncontentInfoValue"
                id="sectioncontentUserNameContent"
                data-field="first_name"
              >
                {" "}
                {first_name}
              </h4>
              <h4
                className="sectioncontentInfoValue"
                id="sectioncontentUserNameContent"
                data-field="last_name"
              >
                {" "}
                {last_name}
              </h4>
            </div>

            <h4 className="sectioncontentUserTitleContent">
              {" "}
              {last_native_name +
                " " +
                middle_native_name +
                " " +
                first_native_name}
            </h4>
            <button className="sectioncontentCopyLinkButton">Copy link</button>

            {(manager && currentuserid === manager.id) || role === "admin" ? (
              <button
                className="sectioncontentEditButton"
                onClick={() => dispatch(HandleEdit())}
                id="editprofile"
              >
                Edit
              </button>
            ) : null}
          </div>

          <div className="sectioncontentProfileContentArea">
            <div className="sectioncontentInfoBlock" id="generalinfosection">
              <h3 className="sectioncontentSectionTitle">
                General Information
              </h3>
              <hr />

              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">department</h4>
                <h4 className="sectioncontentInfoValue" data-field="department">
                  {" "}
                  {department}
                </h4>
              </div>

              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Building</h4>
                <h4 className="sectioncontentInfoValue" data-field="building">
                  {" "}
                  {building}
                </h4>
              </div>
              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Room</h4>
                <h4 className="sectioncontentInfoValue" data-field="room">
                  {" "}
                  {room}
                </h4>
              </div>

              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Desk number</h4>
                <h4
                  className="sectioncontentInfoValue"
                  data-field="desk_number"
                >
                  {" "}
                  {desk_number}
                </h4>
              </div>

              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Date of birth</h4>
                {date_birth && (
                  <div className="namecontainer">
                    <h4
                      className="sectioncontentInfoValue"
                      data-field="date_birth.year"
                    >
                      {" "}
                      {date_birth.year}
                    </h4>
                    /
                    <h4
                      className="sectioncontentInfoValue"
                      data-field="date_birth.month"
                    >
                      {" "}
                      {date_birth.month}
                    </h4>
                    /
                    <h4
                      className="sectioncontentInfoValue"
                      data-field="date_birth.day"
                    >
                      {" "}
                      {date_birth.day}
                    </h4>
                  </div>
                )}
              </div>

              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Manager</h4>
                {manager && (
                  <a href={`/user/${manager.id}`}>
                    <div className="namecontainer">
                      <h4
                        className="sectioncontentInfoValue managerlinkcontent"
                        data-field="manager.first_name"
                      >
                        {" "}
                        {manager.first_name}
                      </h4>
                      <h4
                        className="sectioncontentInfoValue managerlinkcontent"
                        data-field="manager.last_name"
                      >
                        {" "}
                        {manager.last_name}
                      </h4>
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="sectioncontentInfoBlock" id="contactssection">
              <h3 className="sectioncontentSectionTitle">CONTACTS</h3>
              <hr />
              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Mobile phone</h4>
                <h4 className="sectioncontentInfoValue" data-field="phone">
                  <a href="tel: {phone}"> {phone}</a>
                </h4>
              </div>
              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Email</h4>
                <h4
                  className="sectioncontentInfoValue emaillinkcontent"
                  data-field="email"
                >
                  <a href="mailto: {email}"> {email}</a>
                </h4>
              </div>

              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Skype</h4>
                <h4
                  className="sectioncontentInfoValue skypelinkcontent"
                  data-field="skype"
                >
                  <a href="skype: {skype}"> {skype}</a>
                </h4>
              </div>

              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">C-Number</h4>
                <h4 className="sectioncontentInfoValue" data-field="cnumber">
                  {" "}
                  {cnumber}
                </h4>
              </div>
            </div>
            <div className="sectioncontentInfoBlock" id="travelinfosection">
              <h3 className="sectioncontentSectionTitle">TRAVEL INFORMATION</h3>
              <hr />

              <div className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">Citizenship</h4>
                <h4
                  className="sectioncontentInfoValue"
                  data-field="citizenship"
                >
                  {" "}
                  {citizenship}
                </h4>
              </div>
              {visa &&
                visa.map(
                  (
                    { type, start_date, end_date, issuing_country },
                    index: number
                  ) => {
                    const formatDate = (ts: any) => {
                      return new Date(ts).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });
                    };

                    let isexpired = false;
                    const daysbetween = end_date - start_date;
                    const daysbetweencalculated =
                      daysbetween / (1000 * 60 * 60 * 24);
                    const todaysdate = Date.now() - start_date;
                    const daysbetweentoday = todaysdate / (1000 * 60 * 60 * 24);

                    if (daysbetweencalculated > daysbetweentoday) {
                      isexpired = false;
                    } else {
                      isexpired = true;
                    }

                    return (
                      <>
                        <div className="sectioncontentInfoItem">
                          <h4 className="sectioncontentInfoLabel">
                            Visa {index + 1}
                          </h4>
                          <h4 className="sectioncontentInfoValue">
                            {" "}
                            {type + " " + issuing_country}
                          </h4>
                        </div>
                        <div className="sectioncontentInfoItem">
                          <h4 className="sectioncontentInfoLabel">
                            Visa {index + 1} validity period{" "}
                            {isexpired ? "(expired)" : ""}
                          </h4>
                          <h4
                            className={`sectioncontentInfoValue ${
                              isexpired ? "expired" : ""
                            }`}
                          >
                            {" "}
                            {String(
                              formatDate(start_date) +
                                " - " +
                                formatDate(end_date)
                            )}
                          </h4>
                        </div>
                      </>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userinfo
