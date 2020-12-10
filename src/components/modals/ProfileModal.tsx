import React, { useEffect } from 'react'
import ModalReact from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import SVG from 'react-inlinesvg'
import Profile from '@src/components/Profile'
import { closeModal } from '@src/redux/actions/modals'

const ProfileModal = () => {
  ModalReact.setAppElement('#__next')
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const dispatch = useDispatch()
  const modalOpen = useSelector(({ modals }) => modals.modalOpen)

  return (
    <>
      {/*<ModalReact isOpen={modalOpen} contentLabel="Example Modal" className="modal modal_content">
        <Profile closeModal={() => dispatch(closeModal())} />
      </ModalReact>*/}
    </>
  )
}

export default ProfileModal
