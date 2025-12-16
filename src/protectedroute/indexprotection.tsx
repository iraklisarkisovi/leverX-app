import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

export interface IPropType {
    children: JSX.Element;
}

const IndexProtection = ({ children }: IPropType): JSX.Element => {
  const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");

  if (!token) return <Navigate to="/signin" replace />;

  return children;
};

export default IndexProtection
