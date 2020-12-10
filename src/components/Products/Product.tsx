import React from "react";
import {openModal} from "@src/redux/actions/modals";
import {ModalsType} from "@src/ts/enum/modal_enum";

import {useDispatch} from "react-redux";


const Product = () => {
    const dispatch = useDispatch()
    return (
        <div className="product-unit">
            <div className="product-unit__img">
            </div>
            <div className="product-unit__stock">
                -40% if you buy for a gift
            </div>
            <div className="product-unit__row">
                <p className="product-unit__text">Lorem ipsum dolor</p>
                <button className="btn"
                        onClick={() => dispatch(openModal({modalType: ModalsType.PRODUCT_CARD}))}
                        >
                    Get
                </button>
            </div>
        </div>
    )
}

export default Product;