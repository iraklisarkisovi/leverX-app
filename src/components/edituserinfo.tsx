import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../types/types";

import remoteicon from "../assets/remoteicon.png";
import ProfileHeader from "./profileheader";
import GeneralInfoSection from "./generalInfosection";
import ContactsSection from "./contactssection";
import TravelInfoSection from "./travelInfosection";
import { useUpdateUserdataMutation } from "../redux/store/api";
import { useDispatch, useSelector } from "react-redux";
import { GetUpdatedUserState, HandleEdit } from "../redux/userslice";
import { RootState } from "../redux/store/store";

const currentUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
const currentUserRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

const EditUserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { updatedUserData, userData } = useSelector(
    (state: RootState) => state.UserSlice
  );
  const [localUser, setLocalUser] = useState<IUser>(userData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [updateUserApi] = useUpdateUserdataMutation();

  useEffect(() => {
    if (updatedUserData && updatedUserData._id === userData._id) {
      setLocalUser(updatedUserData);
    } else {
      setLocalUser(userData);
    }
  }, [updatedUserData, userData]);

  const detectChanges = useCallback(
    (newUser: IUser) => {
      setHasChanges(JSON.stringify(newUser) !== JSON.stringify(userData));
    },
    [userData]
  );

  const updateUser = useCallback(
    (path: string, value: any) => {
      if (!localUser) return;

      const newUser = JSON.parse(JSON.stringify(localUser));
      const keys = path.split(".");

      let current: any = newUser;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[keys[keys.length - 1]] = value;

      setLocalUser(newUser);
      dispatch(GetUpdatedUserState(newUser));
      detectChanges(newUser);
    },
    [localUser, dispatch, detectChanges]
  );

  const handleSave = async () => {
    if (!hasChanges || isSaving) return;

    setIsSaving(true);
    try {
      await updateUserApi({
        updatedUser: localUser,
        userId: localUser._id,
      }).unwrap();

      dispatch(GetUpdatedUserState(localUser));  
      dispatch(HandleEdit());
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setIsSaving(false);
    }
  };


  const canEdit =
    currentUserId === localUser.manager?.id || currentUserRole === "admin";

  return (
    <div id="userdetail">
      <div className="profilepagewrapper">
        <div className="sectioncontentSidebarSection">
          <Link to="/" className="sectioncontentBackArrowIcon">
            🡠
          </Link>

          <ProfileHeader
            user={localUser}
            remoteicon={remoteicon}
            updateUser={updateUser}
          />

          {canEdit && (
            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="sectioncontentEditButton"
              style={{ opacity: hasChanges ? 1 : 0.5 }}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <div className="sectioncontentProfileContentArea">
          <GeneralInfoSection user={localUser} updateUser={updateUser} />
          <ContactsSection user={localUser} updateUser={updateUser} />
          <TravelInfoSection user={localUser} updateUser={updateUser} />
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
