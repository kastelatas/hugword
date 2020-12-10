import React, {FC, useEffect, useState} from 'react'
import { wrapper } from '@src/redux/store'
import 'react-multi-carousel/lib/styles.css'
import 'react-image-lightbox/style.css'
import Cookies from 'universal-cookie';
import MainLayout from '@src/components/layouts/MainLayout'
import WebSocketProvider from '@src/utils/WebSocket'
import '../src/styles/index.scss'
import 'cropperjs/dist/cropper.css'
import '@src/styles/libs/_react-calendar.scss'
import { userInit } from '@src/redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { getTopicsList } from '@src/redux/actions/user'
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

import { v4 as uuidv4 } from 'uuid'

import { getAmbassadoresList } from '@src/redux/actions/ambassador'
import {State} from '@src/redux/reducers';
import Loader from '@src/components/Loader';

import { connect } from 'react-redux';
import { compose } from 'edux';
import App, {AppInitialProps, AppContext} from 'next/app'
// @ts-ignore

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ auth: { user } }) => user)
  const topicsList = useSelector(({ user: { topics } }) => topics)
  const loading = useSelector(({ auth: { loading } }) => loading)
  const [token, setToken] = useState(false)

  const cookies = new Cookies();
  const fingerprint = cookies.get('fingerprint')
  // const token = localStorage.getItem('Authorization')
  useEffect(() => {
    const token = localStorage.getItem('Authorization')
    setToken(!!token)
    !Boolean(topicsList.length) && dispatch(getTopicsList())
    !fingerprint && cookies.set('fingerprint', new Date().getTime())
    // token && !user && dispatch(userInit())
    fingerprint && dispatch(userInit({fingerprint}))
  }, [fingerprint])


  return (
    <WebSocketProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </WebSocketProvider>
  )
}

/*class MyApp extends App<AppInitialProps> {

  componentDidMount() {
    dispatch(userInit())
  }

  public static getInitialProps = async ({Component, ctx}: AppContext) => {

    ctx.store.dispatch(userInit())

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    }
  }

  public render() {
    const {Component, pageProps} = this.props;

    return (
      <WebSocketProvider>
        <MainLayout>
          <Component {...pageProps} dataw />
        </MainLayout>
      </WebSocketProvider>
    );
  }
}*/

export default wrapper.withRedux(WrappedApp)
