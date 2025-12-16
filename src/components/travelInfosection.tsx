import React from "react";
import { IUser } from "../types/types";

interface Props {
  user: IUser;
  updateUser: (path: string, value: string | number) => void;
}

const formatDate = (timestamp: number | undefined): string => {
  if (!timestamp) return "";
  return new Date(timestamp).toISOString().split("T")[0];
};

const TravelInfoSection: React.FC<Props> = ({ user, updateUser }) => {
  const visas = user.visa || [];

  return (
    <div className="sectioncontentInfoBlock">
      <h3 className="sectioncontentSectionTitle">TRAVEL INFORMATION</h3>
      <hr />

      <div className="sectioncontentInfoItem">
        <h4 className="sectioncontentInfoLabel">Citizenship</h4>
        <input
          type="text"
          value={user.citizenship || ""}
          onChange={(e) => updateUser("citizenship", e.target.value)}
          className="sectioncontentInfoValue"
        />
      </div>

      {visas.map((visa, index) => {
        const isExpired = visa.end_date ? Date.now() > visa.end_date : false;

        return (
          <div
            key={index}
            style={{
              marginTop: "20px",
              paddingTop: "10px",
              borderTop: "1px solid #eee",
            }}
          >
            <h4 className="sectioncontentSectionTitle">Visa {index + 1}</h4>

            {[
              { label: "Type", path: "type" },
              { label: "Issuing Country", path: "issuing_country" },
            ].map(({ label, path }) => (
              <div key={path} className="sectioncontentInfoItem">
                <h4 className="sectioncontentInfoLabel">{label}</h4>
                <input
                  type="text"
                  value={(visa as any)[path] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateUser(`visa[${index}].${path}`, e.target.value)
                  }
                  className="sectioncontentInfoValue"
                />
              </div>
            ))}

            <div className="sectioncontentInfoItem">
              <h4 className="sectioncontentInfoLabel">Start Date</h4>
              <input
                type="date"
                value={formatDate(visa.start_date)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateUser(
                    `visa[${index}].start_date`,
                    new Date(e.target.value).getTime()
                  )
                }
                className="sectioncontentInfoValue"
              />
            </div>

            <div className="sectioncontentInfoItem">
              <h4 className="sectioncontentInfoLabel">
                End Date{" "}
                {isExpired && <span style={{ color: "red" }}>(expired)</span>}
              </h4>
              <input
                type="date"
                value={formatDate(visa.end_date)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateUser(
                    `visa[${index}].end_date`,
                    new Date(e.target.value).getTime()
                  )
                }
                className={`sectioncontentInfoValue ${
                  isExpired ? "expired" : ""
                }`}
              />
            </div>
          </div>
        );
      })}

      {visas.length === 0 && (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          No visa information
        </p>
      )}
    </div>
  );
};

export default TravelInfoSection;
