import Header from "../components/header";
import "../styles/user.scss";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../types/types";
import { useEffect } from "react";
import Userinfo from "../components/userinfo";
import EditUserinfo from "../components/edituserinfo";
import { useGetUsersQuery } from "../redux/store/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { GetUserState } from "../redux/userslice";
import Progress from "../UI components/circularprogress";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading} = useGetUsersQuery();
  const { userData, IsEdit } = useSelector(
    (state: RootState) => state.UserSlice
  );

  useEffect(() => {
    if (!data || !id) return;

    const foundUser = data.find((el: IUser) => el._id === id);
    if (foundUser) {
      dispatch(GetUserState(foundUser));
    } else {
      navigate("/pagenotfound");
    }
  }, [data, id, dispatch]);

  if (!userData) return null;

  return (
    <>
      {isLoading ? (
        <>
          <Progress />
        </>
      ) : (
        <>
          <Header />
          {!IsEdit ? <Userinfo /> : <EditUserinfo />}
        </>
      )}
    </>
  );
};

export default User;
