import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import withPrivateRoute from '@src/hoc/withPrivateRoute'
import UserProfile from '@src/components/UserProfile'
import Profile from '@src/components/Profile'
import { UserType } from '@src/ts/enum/user_enum'
import { getAmbassadorById } from '@src/redux/actions/ambassador'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import Loader from "@src/components/Loader";

const IndexPage = () => {
  const user = useSelector(({ auth: { user } }) => user)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   user && dispatch(getAmbassadorById(user?.id, UserTypeToString[user?.type]))
  // },[user])

  if (user?.type === UserType.Ambassador) {
    return <Profile editMode />
  }

  if (user?.type === UserType.Client ) {
    return <UserProfile editMode />
  }

  return <Loader />
}
export default withPrivateRoute(IndexPage)
