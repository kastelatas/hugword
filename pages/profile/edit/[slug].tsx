import React from 'react'
import Profile from "@src/components/Profile";
import { getAmbassadorById } from '@src/redux/actions/ambassador'
import { wrapper } from '@src/redux/store'

const ProfilePage = () => {
  return <Profile />
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, res, params }) => {
  await store.dispatch(getAmbassadorById(params?.slug))
})

export default ProfilePage
