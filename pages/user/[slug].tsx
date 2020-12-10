import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setPasswordConfirm, setEmailConfirm } from '@src/redux/actions/auth'

const RedirectPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    router.push('/user-profile')
    router.query.slug === 'set-password-confirm' &&
      router.query.token &&
      dispatch(setPasswordConfirm(router.query.token))
    router.query.slug === 'set-email-confirm' &&
      router.query.token &&
      dispatch(setEmailConfirm(router.query.email, router.query.token, router.query.slug))
    router.query.slug === 'verify-email-confirm' &&
      router.query.token &&
      dispatch(setEmailConfirm(router.query.email, router.query.token, router.query.slug))
    router.query.slug === 'reset-password-confirm' &&
      router.query.token &&
      dispatch(setEmailConfirm(router.query.token, router.query.slug))
  }, [router])

  return <h1>Redirect</h1>
}

export default RedirectPage
