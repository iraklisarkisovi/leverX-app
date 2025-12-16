import Header from "../components/header";
import "../styles/user.scss"
import {  useParams } from 'react-router-dom';
import { IUser } from "../types/types";
import { useEffect } from "react";
import Userinfo from "../components/userinfo";
import EditUserinfo from "../components/edituserinfo";
import { useGetUsersQuery } from "../redux/store/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { GetUserState } from "../redux/userslice";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data } = useGetUsersQuery();
  const {userData, IsEdit} = useSelector(
    (state: RootState) => state.UserSlice
  );

  useEffect(() => {
    if (!data || !id) return;

    const foundUser = data.find((el: IUser) => el._id === id);
    if (foundUser) {
      dispatch(GetUserState(foundUser));  
    }
  }, [data, id, dispatch]);

  if (!userData) return null;  

  return (
    <>
      <Header />
      {!IsEdit ? (
        <Userinfo/>
      ) : (
        <EditUserinfo />
      )}
    </>
  );
};

export default User
