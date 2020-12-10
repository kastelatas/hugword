import React, { useEffect } from 'react'
import Reviews from '@src/components/Reviews/Reviews'
import {useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import {getAmbassadorById} from "@src/redux/actions/ambassador";

const ReviewsPageId = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)

  useEffect(()=> {
    router?.query?.id &&  dispatch(getAmbassadorById(router?.query?.id, 'ambassador'))
  },[router?.query?.id])

  return <Reviews data={ambassador} />
}

export default ReviewsPageId
