import Header from "../components/header";
import "../styles/style.scss"
import Usercard from "../components/usercard";
import AdvancedSearch, { IAdvancedSearchInputType } from "../components/advancesearch";
import { useEffect, useState } from "react";
import { IDataUsers, IUser } from "../types/types";
import BasicSearch from "../components/basicsearch";
import { useGetUsersQuery } from "../redux/store/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const Home = () => {
    const [data, setData] = useState<IDataUsers>([]);
    const [searchdata, setSearchData] = useState<IDataUsers | null>(null);
    const [check, setCheck] = useState<boolean>(false);
    const basicinput = useSelector((state: RootState) => state.HomeSlice.BasicSearch)
    const {data: users} = useGetUsersQuery();

    const FilterData = () => {
      const filter = data.filter(
        (user: IUser) =>
          user.first_name.toLocaleLowerCase().includes(basicinput) ||
          user.last_name.toLocaleLowerCase().includes(basicinput)
      );
      const IsData = filter ? filter : data;
      setSearchData(IsData);
    }

    const HandleAdvancedSearch = (values: IAdvancedSearchInputType) => {
      const filter = data.filter((user: IUser) => {
      return (
          (user.first_name?.toLowerCase() || "").includes(values.name?.toLowerCase() || "") &&
          (user.email?.toLowerCase() || "").includes(values.email?.toLowerCase() || "") &&
          (user.phone?.toLowerCase() || "").includes(values.phone?.toLowerCase() || "") &&
          (user.skype?.toLowerCase() || "").includes(values.skype?.toLowerCase() || "") &&
          (user.room?.toLowerCase() || "").includes(values.room?.toLowerCase() || "") &&
          (user.department?.toLowerCase() || "").includes(values.department?.toLowerCase() || "") &&
          (user.building?.toLowerCase() || "").includes(values.building?.toLowerCase() || "")
        );
      });

      const IsData = filter ? filter : data;
      setSearchData(IsData)
    };

    const GetUsers = async () => {
      const IsData = users === undefined ? [] : users
      setData(IsData);
    };

    useEffect(() => {
      GetUsers();
    }, [users]);

  return (
    <>
      <Header />
      <div className="maincontainer">
        <div className="searchcontainer">
          <button
            className="searchtypecontainer"
            onClick={() => setCheck((prev) => !prev)}
          >
            <h4 className={!check ? "buttontype1 checked" : "buttontype1"}>
              BASIC SEARCH
            </h4>
            <h4 className={check ? "buttontype2 checked" : "buttontype2"}>
              ADVANCED SEARCH
            </h4>
          </button>
          <div className="searchformcontainer">
            {check ? (
              <AdvancedSearch HandleAdvancedSearch={HandleAdvancedSearch} />
            ) : (
              <BasicSearch FilterData={FilterData} />
            )}
            <button className="searchbutton red" onClick={() => setSearchData(data)}>
              RESET
            </button>
          </div>
        </div>
        <Usercard data={searchdata === null ? data : searchdata} />
      </div>
    </>
  );
}

export default Home;

