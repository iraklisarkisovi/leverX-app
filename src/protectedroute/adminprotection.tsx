import { JSX } from 'react'
import { Navigate } from 'react-router-dom';
import { IPropType } from './indexprotection';

const AdminProtection = ({ children }: IPropType): JSX.Element => {
  const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");
  const roletoken =
    localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  if (!token || roletoken !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default AdminProtection;
