
import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';

const AuthLayout = ({authUser}) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
        {!authUser?<Outlet />:<Navigate to="/"/>}

  </div>
  );
};

export default AuthLayout;
