import React from "react";
import { IUser } from "../types/types";

interface Props {
  user: IUser;
  remoteicon: string;
  updateUser: (path: string, value: string) => void;
}

const ProfileHeader: React.FC<Props> = ({ user, remoteicon, updateUser }) => {
  return (
    <>
      <div className="profileimage">
        <img
          src={user.user_avatar || "/assets/users/userpicture.png"}
          alt={`${user.first_name} ${user.last_name}`}
          className="sectioncontentProfilePictureContent"
        />
        {user.isRemoteWork && (
          <img src={remoteicon} className="remote" alt="Remote" />
        )}
      </div>

      <div className="namecontainer">
        <input
          type="text"
          value={user.first_name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateUser("first_name", e.target.value)
          }
          className="sectioncontentInfoValue"
          placeholder="First Name"
        />
        <input
          type="text"
          value={user.last_name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateUser("last_name", e.target.value)
          }
          className="sectioncontentInfoValue"
          placeholder="Last Name"
        />
      </div>

      <div
        className="namecontainer"
        style={{ flexDirection: "column", gap: "8px" }}
      >
        <h5 style={{ margin: 0 }}>Native Name (Last | Middle | First)</h5>
        {["last_native_name", "middle_native_name", "first_native_name"].map(
          (field) => (
            <input
              key={field}
              type="text"
              value={(user as any)[field] || ""}
              placeholder={field.replace(/_/g, " ").replace("native name", "")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateUser(field, e.target.value)
              }
              className="usertitleContent"
            />
          )
        )}
      </div>

      <button className="sectioncontentCopyLinkButton">Copy Link</button>
    </>
  );
};

export default ProfileHeader;
