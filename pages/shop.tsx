import React from "react";
import IconButton from "@src/components/Button/IconButton";
import closeIcon from "../public/icons/close.svg";
import Pannel from "@src/components/Tabs/Panel";
import Tabs from "@src/components/Tabs/Tabs";
import InlineSVG from "react-inlinesvg";
import mainBiling from '../public/icons/main-billing.svg'
import ProductsList from "@src/components/Products/ProductsList";
import {useRouter} from "next/router";
const Shop = ({ asModal, editMode, isMiniProfile, handleMenuLeft }) => {

    const router = useRouter()
    const goBack = () => router.back()


    return(
        <div className="shop-page">
            <div className="shop-header">
                <div className="shop-header__close">
                    <IconButton close icon={closeIcon} onClick={asModal ? handleMenuLeft : goBack} />
                </div>
                <div className="shop-header__row">
                    <div className="shop-header__col">
                       <div className="shop-header__col-icon">
                           <InlineSVG src={mainBiling} />
                       </div>
                        <p className="shop-header__text">Bonus talkens:  <span>100</span> BTLK</p>
                    </div>
                    <div className="shop-header__col">
                        <InlineSVG src={mainBiling} />
                        <p className="shop-header__text">Talkens:  <span>1385</span> BTLK</p>
                    </div>
                </div>
            </div>

            <Tabs>
                <Pannel title="Emojis">
                    <ProductsList/>
                </Pannel>

                <Pannel title="Customization">
                    <ProductsList/>
                </Pannel>

                <Pannel title="Trust Points">
                    <ProductsList/>
                </Pannel>


            </Tabs>
        </div>
    )
}

export default Shop;