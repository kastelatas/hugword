import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import SVG from 'react-inlinesvg'
import {closeModal} from '@src/redux/actions/modals'
import * as FormControl from "@src/components/Form";
import InlineSVG from "react-inlinesvg";

const GetAcquaintedModalContent = () => {
    const dispatch = useDispatch()

    return (
        <div className="modal-spret">
            <h3 className="modal__title">Let's get acquainted</h3>
            <p className="modal__text">Please enter your name. <br/>
                It will make your communication easier.</p>
            <div className="input-group">
            <span className="input-group__icon">
              <InlineSVG src="/icons/main-text.svg"/>
            </span>
                <div className="input-group__block">
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your name"
                    />
                </div>
            </div>
            <div className="modal__actions">
                <button className="btn" onClick={() => dispatch(closeModal())} type="button">Done</button>
            </div>
        </div>
    )
}

export default GetAcquaintedModalContent
