import React from 'react'
import SVG from 'react-inlinesvg'
import InlineSVG from 'react-inlinesvg'
import shop from '/public/icons/shop.svg'

import { useSelector } from 'react-redux'
import CarouselItem from '@src/components/CarouselItem'

const ProductCardContent = () => {
  const data = [
    {
      img: '/img/6829.png',
    },
    {
      img: '/img/6829.png',
    },
    {
      img: '/img/6829.png',
    },
  ]

  return (
    <div className="product-item">
      <div className="product-item__row">
        <div className="product-item__slider">
          <CarouselItem numberOfCards={1} data={data} />
        </div>
        <div className="product-item__col">
          <h2 className="product-item__title">Lorem ipsum dolor</h2>
          <p className="product-item__text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam.
          </p>
          <div className="product-item__row">
            <p className="product-item__price">
              Price: <span>100</span> TLK or <span>200</span> BTLK
            </p>
            <p className="product-item__stock">
              -<span>40%</span> if you buy for a gift
            </p>
          </div>
          <div className="product-item__row">
            <button className="btn">Buy</button>
            <button className="btn-present">
              <InlineSVG src={shop} />
              Present
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardContent
