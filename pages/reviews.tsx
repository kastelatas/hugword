import React, { useEffect } from 'react'
import Reviews from '@src/components/Reviews/Reviews'
import {useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import {getAmbassadorById} from "@src/redux/actions/ambassador";
import {getReviews} from "@src/redux/actions/user";
import {getProfile} from "@src/redux/actions/profile";
import {UserTypeToString} from "@src/ts/enum/user_enum";

const ReviewsPage = () => {


    const dispatch = useDispatch()
    const user = useSelector(({ auth: { user } }) => user)

    useEffect(()=> {
       !user?.profile?.reviews &&  user?.id && dispatch(getProfile(user?.id, UserTypeToString[user?.type]))
    },[user?.id])

    return user ? <Reviews data={user} /> : null
}

export default ReviewsPage
