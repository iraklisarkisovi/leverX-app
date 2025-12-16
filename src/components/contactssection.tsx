import React from "react";
import { IUser } from "../types/types";

interface Props {
  user: IUser;
  updateUser: (path: string, value: string) => void;
}

const ContactsSection: React.FC<Props> = ({ user, updateUser }) => {
  const fields = [
    { label: "Mobile phone", path: "phone", type: "tel" },
    { label: "Email", path: "email", type: "email" },
    { label: "Skype", path: "skype", type: "text" },
    { label: "C-Number", path: "cnumber", type: "text" },
  ] as const;

  return (
    <div className="sectioncontentInfoBlock" id="contactssection">
      <h3 className="sectioncontentSectionTitle">CONTACTS</h3>
      <hr />

      {fields.map(({ label, path, type }) => (
        <div key={path} className="sectioncontentInfoItem">
          <h4 className="sectioncontentInfoLabel">{label}</h4>
          <input
            type={type}
            value={(user as any)[path] || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateUser(path, e.target.value)
            }
            className="sectioncontentInfoValue"
            placeholder={label}
            autoComplete={
              type === "email" ? "email" : type === "tel" ? "tel" : "off"
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ContactsSection;
