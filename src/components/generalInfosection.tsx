import React from "react";
import { IUser } from "../types/types";

interface Props {
  user: IUser;
  updateUser: (path: string, value: string | number) => void;
}

const GeneralInfoSection: React.FC<Props> = ({ user, updateUser }) => {
  if (!user) return null;  

  return (
    <div className="sectioncontentInfoBlock">
      <h3 className="sectioncontentSectionTitle">General Information</h3>
      <hr />

      {[
        { label: "Department", path: "department" },
        { label: "Building", path: "building" },
        { label: "Room", path: "room" },
        { label: "Desk number", path: "desk_number", type: "number" },
      ].map(({ label, path, type = "text" }) => (
        <div key={path} className="sectioncontentInfoItem">
          <h4 className="sectioncontentInfoLabel">{label}</h4>
          <input
            type={type}
            value={(user as any)[path] ?? ""}
            onChange={(e) =>
              updateUser(
                path,
                type === "number" ? Number(e.target.value) || 0 : e.target.value
              )
            }
            className="sectioncontentInfoValue"
          />
        </div>
      ))}

      <div className="sectioncontentInfoItem">
        <h4 className="sectioncontentInfoLabel">Date of birth (Y/M/D)</h4>
        <div className="namecontainer">
          {["year", "month", "day"].map((part) => (
            <input
              key={part}
              type="number"
              placeholder={part.charAt(0).toUpperCase()}
              value={
                user.date_birth?.[part as keyof typeof user.date_birth] ?? ""
              }
              onChange={(e) =>
                updateUser(`date_birth.${part}`, Number(e.target.value) || 0)
              }
              className="sectioncontentInfoValue"
              style={{ width: "80px" }}
            />
          ))}
        </div>
      </div>

      <div className="sectioncontentInfoItem">
        <h4 className="sectioncontentInfoLabel">Manager</h4>
        <div className="namecontainer">
          <input
            type="text"
            value={user.manager?.first_name ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateUser("manager.first_name", e.target.value)
            }
            placeholder="First"
            className="sectioncontentInfoValue"
          />
          <input
            type="text"
            value={user.manager?.last_name ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateUser("manager.last_name", e.target.value)
            }
            placeholder="Last"
            className="sectioncontentInfoValue"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoSection;
