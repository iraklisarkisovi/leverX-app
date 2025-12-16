import React, { useState } from 'react'

export interface IAdvancedSearchInputType {
  name: string,
  email: string,
  phone: string,
  skype: string,
  building: string,
  room: string,
  department: string
}

interface IAdvancedSearchPropsType {
  HandleAdvancedSearch: (values: IAdvancedSearchInputType) => void;
}

const AdvancedSearch: React.FC<IAdvancedSearchPropsType> = ({
  HandleAdvancedSearch,
}) => {
  const [searchvalues, setSearchvalues] = useState<IAdvancedSearchInputType>({
    name: "",
    email: "",
    phone: "",
    skype: "",
    building: "",
    room: "",
    department: "",
  });

  return (
    <div className="section">
      <div className="searchformcontainer">
        <div className="inputcontainer">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
            placeholder="John Smith"
            className="advancedinput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchvalues((prev: any) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="inputcontainer">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            id="Email"
            placeholder="John.smith@leverx.com"
            className="advancedinput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchvalues((prev: any) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className="rowcontainer">
          <div className="inputcontainer">
            <label htmlFor="Phone">Phone</label>
            <input
              type="text"
              id="Phone"
              placeholder="Phone number"
              className="advancedinput"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchvalues((prev: any) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </div>
          <div className="inputcontainer">
            <label htmlFor="Skype">Skype</label>
            <input
              type="text"
              id="Skype"
              placeholder="SkypeID"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchvalues((prev: any) => ({
                  ...prev,
                  skype: e.target.value,
                }))
              }
              className="advancedinput"
            />
          </div>
        </div>
        <div className="rowcontainer">
          <div className="inputcontainer">
            <label htmlFor="Building">Building</label>
            <select
              id="Building"
              className="advancedinput"
              onChange={(e: any) =>
                setSearchvalues((prev: any) => ({
                  ...prev,
                  building: e.target.value,
                }))
              }
            >
              <option value="any">Any</option>
              <option value="Main Office Tower (USA)">
                Main Office Tower (USA)
              </option>
              <option value="London Tower (UK)">London Tower (UK)</option>
              <option value="Pilsudskiego 69 (Poland)">
                Pilsudskiego 69 (Poland)
              </option>
            </select>
          </div>
          <div className="inputcontainer">
            <label htmlFor="Room">Room</label>
            <input
              type="text"
              id="Room"
              placeholder="303.1"
              className="advancedinput"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchvalues((prev: any) => ({
                  ...prev,
                  room: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="inputcontainer">
          <label htmlFor="Department">Department</label>
          <select
            id="Department"
            className="advancedinput"
            onChange={(e: any) =>
              setSearchvalues((prev: any) => ({
                ...prev,
                department: e.target.value,
              }))
            }
          >
            <option value="any">Any</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Web & Mobile">Web & Mobile</option>
            <option value="UX/UI Design">UX/UI Design</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>
        <button className="searchbutton" onClick={() => HandleAdvancedSearch(searchvalues)}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
