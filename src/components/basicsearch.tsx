import React from "react";
import { useDispatch } from "react-redux";
import { HandleBasicChange } from "../redux/mainslice";

interface IHandleSearchType {
  FilterData: () => void;
}

const BasicSearch: React.FC<IHandleSearchType> = ({
  FilterData,
}) => {
  const dispatch = useDispatch()
  
  const HandleInput = (e: string) => {
    dispatch(HandleBasicChange(e));
  }
  return (
    <>
      <input
        type="text"
        placeholder="John Smith"
        className="basicinput"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          HandleInput(e.target.value)
        }
      />
      <button className="searchbutton" onClick={() => FilterData()}>
        SEARCH
      </button>
    </>
  );
};

export default BasicSearch
