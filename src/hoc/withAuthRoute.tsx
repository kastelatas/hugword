import React from 'react';
import Router from 'next/router'
import { useSelector } from "react-redux";

const login = '/' // Define your login route address.


export default WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  const currUser = useSelector(({ auth }) => auth)

  if (!currUser.loading && currUser?.user ) {
    return null
  }

  return hocComponent
}