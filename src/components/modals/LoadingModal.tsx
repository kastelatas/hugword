import React from 'react'
import ModalReact from 'react-modal'
import SVG from 'react-inlinesvg'
import { useSelector } from 'react-redux'
import loadIcon from '../../../public/icons/Rolling.svg'

const LoadingModal = () => {
  ModalReact.setAppElement('#__next')
  const modalOpen = useSelector(({ modals: { loadingOpen } }) => loadingOpen)

  return (
    <>
      <ModalReact
        isOpen={modalOpen}
        contentLabel="Example Modal"
        className="modal modal_type_loading"
        style={{
          overlay: {
            zIndex: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
      >

    <SVG src={loadIcon}/>
      </ModalReact>
    </>
  )
}

export default LoadingModal
