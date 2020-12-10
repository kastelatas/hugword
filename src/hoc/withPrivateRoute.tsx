import React from 'react';
import Router from 'next/router'

const login = '/' // Define your login route address.

const checkUserAuthentication = () => {
  return { auth: true } // change null to { isAdmin: true } for test it.
}

export default WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  hocComponent.getInitialProps = async ({ res }) => {

    const userAuth = await checkUserAuthentication()
    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (res) {
        res?.writeHead(302, {
          Location: login,
        })
        res?.end()
      } else {
        Router.replace(login)
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(userAuth);
      return { ...wrappedProps, userAuth }
    }

    return { userAuth }
  }

  return hocComponent
}