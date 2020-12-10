import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setPasswordConfirm, setEmailConfirm, userInit } from '@src/redux/actions/auth'

const SocialRedirectPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('Authorization')
    router.query.token && localStorage.setItem('Authorization', `${router.query.token}`)
    router.query.token && router.query.token && dispatch(userInit({ token: router.query.token }))
    router.replace('/')
  }, [router])

  return <h1>Redirect</h1>
}

export default SocialRedirectPage
