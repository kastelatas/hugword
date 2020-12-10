import React from 'react'
import ModalReact from 'react-modal'
import SVG from 'react-inlinesvg'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '@src/redux/actions/modals'
import FileUploadModalContent from '@src/components/modals/FileUploadModalContent'
import AuthModalContent from '@src/components/modals/AuthModalContent'
import TopicUploadModalContent from '@src/components/modals/TopicUploadModalContent'
import MailSendingModalContent from '@src/components/modals/MailSendingModalContent'
import SuccessChangedModalContent from '@src/components/modals/SuccessChangedModalContent'
import ErrorChangedModalContent from '@src/components/modals/ErrorChangedModalContent'
import NeedMoreTalkensModalContent from '@src/components/modals/NeedMoreTalkensModalContent'
import ProductCardContent from '@src/components/modals/ProductCardContent'
import classNames from 'classnames'
import GetAcquaintedModalContent from '@src/components/modals/GetAcquaintedModalContent'
import VerificationEmailModalContent from '@src/components/modals/VerificationEmailModalContent'
import FillWithModalContent from '@src/components/modals/FillWithModalContent'
import ThankYouReviewModalContent from '@src/components/modals/ThankYouReviewModalContent'
import OopsModalContent from '@src/components/modals/OopsModalContent'
import SuccessBalanceModalContent from '@src/components/modals/SuccessBalanceModalContent'
import VerifiedModalContent from '@src/components/modals/VerifiedModalContent'
import NeedMoreCashModalContent from '@src/components/modals/NeedMoreCashModalContent'
import VideoUploadModalContent from '@src/components/modals/VideoUploadModalContent'
import { ModalsType } from '../../ts/enum/modal_enum'
import ForgotPasswordModalContent from "@src/components/modals/ForgotPasswordModalContent";

const Modal = () => {
  ModalReact.setAppElement('#__next')
  const dispatch = useDispatch()
  const modalOpen = useSelector(({ modals: { modalOpen } }) => modalOpen)
  const modalType = useSelector(({ modals: { modalType } }) => modalType)

  const root = classNames(
    'modal',
    {
      modal_img: ModalsType.IMG_UPLOAD === modalType?.modalType,
    },
    { modal_card: ModalsType.PRODUCT_CARD === modalType?.modalType },
  )

  return (
    <>
      <ModalReact
        isOpen={modalOpen}
        contentLabel="Example Modal"
        className={root}
        style={{
          overlay: {
            zIndex: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <button
          className="modal__close btn-icon btn-icon_type_close"
          onClick={() => dispatch(closeModal())}
          type="button"
        >
          <div className="btn-icon__content">
            <SVG src="/icons/close.svg" />
          </div>
        </button>
        {ModalsType.IMG_UPLOAD === modalType?.modalType && <FileUploadModalContent imgType={modalType.imgType} />}
        {ModalsType.VIDEO_UPLOAD === modalType?.modalType && <VideoUploadModalContent />}
        {ModalsType.AUTH === modalType?.modalType && <AuthModalContent />}
        {ModalsType.TOPIC === modalType?.modalType && <TopicUploadModalContent />}
        {ModalsType.MAIL_SENDING === modalType?.modalType && <MailSendingModalContent />}
        {ModalsType.PRODUCT_CARD === modalType?.modalType && <ProductCardContent />}
        {ModalsType.SUCCESS === modalType?.modalType && <SuccessChangedModalContent />}
        {ModalsType.ERROR === modalType?.modalType && <ErrorChangedModalContent />}
        {ModalsType.SUCCESS_BALANSES === modalType?.modalType && <SuccessBalanceModalContent />}
        {ModalsType.GET_ACQUAINDED === modalType?.modalType && <GetAcquaintedModalContent />}
        {ModalsType.VERIFICATION_MODAL === modalType?.modalType && <VerificationEmailModalContent />}
        {ModalsType.FORGOT_PASSWORD === modalType?.modalType && <ForgotPasswordModalContent />}
        {ModalsType.FILL_WITH === modalType?.modalType && <FillWithModalContent />}
        {ModalsType.THANK_YOU_REVIEW === modalType?.modalType && <ThankYouReviewModalContent />}
        {ModalsType.OOPS === modalType?.modalType && <OopsModalContent />}
        {ModalsType.SUCCESS_BALANCE === modalType?.modalType && <SuccessBalanceModalContent />}
        {ModalsType.VERIFYED === modalType?.modalType && <VerifiedModalContent />}
        {ModalsType.NOT_CASH === modalType?.modalType && <NeedMoreCashModalContent />}
        {ModalsType.NOT_TALKENS === modalType?.modalType && <NeedMoreTalkensModalContent />}

        {/* <h3 className="modal__title">How do you feel about chat with Valerie?</h3> */}

        {/* <p className="modal__text"> */}
        {/*  Your Review has been sent to moderation. Thank you for helping to make HugWord better! */}
        {/* </p> */}

        {/* <div className="input-group input-group_block">
          <span className="input-group__icon">
            <SVG src="/icons/main-dot.svg" />
          </span>
          <input type="text" placeholder="Enter your e-mail" />
        </div> */}

        {/* <div className="input-group input-group_block">
          <span className="input-group__icon">
            <SVG src="/icons/main-dot.svg" />
          </span>
          <input type="text" placeholder="Enter your password" />
        </div> */}

        {/* <div className="modal__row">
          <div className="ava ava_lg">
            <img className="ava__img" src="/img/Layer2691.png" />
          </div>
          <div className="stars" data-rating="3" />
        </div> */}

        {/* <div className="modal__icon">
          <SVG src="/icons/main-dot.svg" />
        </div> */}

        {/* <div className="modal__actions">
          <button className="btn btn-outline-primary" onClick={closeModal} type="button">
            Reset
          </button>
          <button className="btn" onClick={closeModal} type="button">
            Done
          </button>
          <a href="#" className="link" type="button">
            Forgot your password?
          </a>
        </div> */}

        {/* <div className="modal__footer">
          <span>Or sign in using other services</span>
          <span className="input-group__icon">
            <SVG src="/icons/main-dot.svg" />
          </span>
          <span className="input-group__icon">
            <SVG src="/icons/main-dot.svg" />
          </span>
        </div> */}
      </ModalReact>
    </>
  )
}

export default Modal
