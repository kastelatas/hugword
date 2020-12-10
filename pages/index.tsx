import React, { useEffect } from 'react'
import PersonsBlock from '@src/components/PersonsBlock'
import Banner from '@src/components/Banner'
import { getAmbassadoresList } from '@src/redux/actions/ambassador'
import { wrapper } from '@src/redux/store'
import * as Main from '@src/components/layouts/Main'
import ProfileModal from '@src/components/modals/ProfileModal'
import {useDispatch, useSelector} from 'react-redux'
import { UserType } from '@src/ts/enum/user_enum'
import { useRouter } from 'next/router'
// import * as Fingerprint2 from 'fingerprintjs2'
// const Fingerprint2 = require('fingerprintjs2');
// const fp_instance = Fingerprint2()

// setTimeout(function () {
//   fp_instance.get(function (result:string, components:[{ key:string, value:string }]) {
//     const fingerprint = fp_instance.x64hash128(components.map(function (pair:any) { return pair.value; }).join(), 31);
//     res(fingerprint)
//   });
// }, 500)
// console.log(Fingerprint2)
const IndexPage = () => {
  const currUser = useSelector(({ auth: { user } }) => user)
  const ambassadorList = useSelector(({ ambassador: { list } }) => list)
  const ambassadorLoading = useSelector(({ ambassador: { loading } }) => loading)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    !ambassadorList.length && !ambassadorLoading && dispatch(getAmbassadoresList())
    currUser?.type === UserType.Ambassador && router.replace('/dashboard')
  }, [currUser])

  return (
    <Main.MainContent>
      <Banner />
      <PersonsBlock />
      <ProfileModal />
    </Main.MainContent>
  )
}

// TODO NEEDS TO BE FIX. NEEDS TO GET TOKEN FOR SERVER
// export const getServerSideProps = wrapper.getStaticProps(async ({ store }) => {
//   await store.dispatch(getAmbassadoresList())
// })

export default IndexPage
