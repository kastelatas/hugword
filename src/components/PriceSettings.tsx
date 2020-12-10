import React from 'react'
import InlineSVG from 'react-inlinesvg'
import talkEarnedIcon from '../../public/icons/talk-earned.svg'
import Counter from './counter'
import { useSelector } from "react-redux";

const PriceSettings = ({ title }) => {
  const user = useSelector(({auth: {user}}) => user)
  return (
    <div className="price-settings">
      <div className="price-settings__svg-right">
        <InlineSVG src={talkEarnedIcon} />
      </div>
      <div className="price-settings__row">
        {title ? (
          <span className="price-settings__line-text-light ">Talkens per message</span>
        ) : (
          <div className="price-settings__row">
            <span className="price-settings__line-text ">Price settings</span>
            <span className="price-settings__line-text-light ">talkens per message</span>
          </div>
        )}
      </div>
      <Counter defaultValue={user?.profile?.price}/>
      <div className="price-settings__helper" data-toggle="Lorem ipsum dolore price">
        ?
      </div>
    </div>
  )
}

export default PriceSettings
