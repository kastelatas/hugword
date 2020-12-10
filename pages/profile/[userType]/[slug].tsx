import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from "react-redux"
import Profile from "@src/components/Profile"
import { getAmbassadorById } from '@src/redux/actions/ambassador'
import { wrapper } from '@src/redux/store'
import {UserType} from "@src/ts/enum/user_enum"
import UserProfile from "@src/components/UserProfile"
import Loader from "@src/components/Loader"

const ProfilePage = () => {
  const router = useRouter()
    const dispatch = useDispatch()
    const currUserId = router.query?.slug
    const currUserType = router.query?.userType
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const loading = useSelector(({ ambassador: { loading } }) => loading)

    useEffect(() => {
          currUserId && dispatch(getAmbassadorById(currUserId, currUserType))
    },[currUserId])

    if (!currUserId || loading) {
        return <Loader />
    }

  return ambassador?.type === UserType.Ambassador ? <Profile /> : <UserProfile />
}

// export const getServerSideProps = wrapper.getServerSideProps(async ({ store, res, params }) => {
//   await store.dispatch(getAmbassadorById(params?.slug, params?.userType ))
// })

export default ProfilePage