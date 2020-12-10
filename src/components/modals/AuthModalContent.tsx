import React, {useEffect, useState} from 'react'
import InlineSVG from 'react-inlinesvg'
import { auth, login, signUp } from '@src/redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import { openModal } from '@src/redux/actions/modals'
import { ModalsType } from '@src/ts/enum/modal_enum'
import googleIcon from '../../../public/icons/socials/google.svg'
import fbIcon from '../../../public/icons/socials/facebook.svg'
import keycodes from "react-accessible-accordion/dist/types/helpers/keycodes";

const items = [
  { id: 1, label: 'LOG IN', active: true },
  { id: 2, label: 'SIGN UP', active: false },
]

const AuthModalContent = () => {
  const dispatch = useDispatch()
  const errors = useSelector(({ auth: { errorMessage } }) => errorMessage)
  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
    signUp: false,
  })

  const [itemsTab, setItemsTab] = useState(items)
  const isLogin = itemsTab[0].active



  const handleInputValue = (e) => {
    const { value } = e.target
    setState({
      ...state,
      [e.target.name]: value,
    })
  }

  const handleClickActive = (e, id) => {
    const newMap = itemsTab.map((i) => (i.id === id ? (i.active = true) : (i.active = false)))
    dispatch({ type: 'CLEAR_FORM_DATA' })
    setState([...newMap])
  }


const signInHandler = () => {
  dispatch(login(state.email, state.password))
}

const enterSignInHandler = (e) => {
    console.log(e)
  if(e.key == 'Enter'){
    dispatch(login(state.email, state.password))
  }
}


  return (
    <div className="modal_type_auth">
      <h3 className="modal__title">SIGN IN</h3>
      {/* <div className="modal__title__tab ">
        {itemsTab.map((i) => {
          return (
            <h3 className="modal__title">
              <a
                href="#"
                onClick={(e) => handleClickActive(e, i.id)}
                key={i.id}
                className={classNames('modal__tab-item', { 'modal__tab-item_active': i.active })}
              >
                {i.label}
              </a>
            </h3>
          )
        })}
      </div> */}
      <div className="input-group" >
        <span className="input-group__icon">
          <InlineSVG src="/icons/main-text.svg" />
        </span>
        <div className="input-group__block">
          <input
            name="email"
            type="email"
            value={state.email}
            placeholder="Enter your e-mail"
            onChange={handleInputValue}
            onKeyPress={enterSignInHandler}
          />
          {Boolean(errors.email?.length) && errors.email.map((i) => <div className="input-group__invalid">{i}</div>)}
        </div>
      </div>

      <div className="input-group input-group_block">
        <span className="input-group__icon">
          <InlineSVG src="/icons/main-pass.svg" />
        </span>
        <div className="input-group__block">
          <input
            name="password"
            type="password"
            value={state.password}
            placeholder="Enter your password"
            onChange={handleInputValue}
            onKeyPress={enterSignInHandler}
          />
          {Boolean(errors.password?.length) &&
            errors.password.map((i) => <div className="input-group__invalid">{i}</div>)}
        </div>
      </div>

      {/* {!isLogin && ( */}
      {/*  <div className="input-group input-group_block"> */}
      {/*    <span className="input-group__icon"> */}
      {/*      <InlineSVG src="/icons/main-text.svg" /> */}
      {/*    </span> */}
      {/*    <div className="input-group__block"> */}
      {/*      <input */}
      {/*        name="name" */}
      {/*        type="text" */}
      {/*        value={state.name} */}
      {/*        placeholder="Enter your full name" */}
      {/*        onChange={handleInputValue} */}
      {/*      /> */}
      {/*      {Boolean(errors.name?.length) && */}
      {/*        errors.name.map((i) => <div className="input-group__invalid">{i}</div>)} */}
      {/*    </div> */}
      {/*  </div> */}
      {/* )} */}

      <div className="modal__actions">
        {isLogin && <Button onClick={() => signInHandler()}>Done</Button>}
        {!isLogin && <Button onClick={() => dispatch(signUp(state.email, state.password, state.name))}>SignUp</Button>}
        {isLogin && (
          <span href="#" className="link" type="button" onClick={() => dispatch(openModal({ modalType: ModalsType.FORGOT_PASSWORD }))}>
            Forgot your password?
          </span>
        )}
      </div>

      <div className="modal__footer">
        <span>Or you can signin with your social account:</span>
        <a className="facebook auth-link" href="https://api.dev.hugword.com/user/auth?authclient=facebook"
           title="Facebook" data-popup-width="860" data-popup-height="480">
          <span className="input-group__icon">
          <InlineSVG src={ fbIcon} />
        </span>
        </a>
        <a className="google auth-link" href="https://api.dev.hugword.com/user/auth?authclient=google" title="Google">
          <InlineSVG src={googleIcon} />
        </a>
      </div>
    </div>
  )
}

export default AuthModalContent
