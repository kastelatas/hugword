import React, { useEffect, useState } from 'react'
import Button from '@src/components/Button/Button'
import SVG from 'react-inlinesvg'
import Calendar from 'react-calendar'
import { convertFromTimeStampToDateWithoutTime } from '@src/utils/DateTimeHelper'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Payment = () => {
  const router = useRouter()

  const currUser = useSelector(({ auth: { user } }) => user)

  const arr = [...Array.from(Array(1).keys())]
  const [value, setValue] = useState(0)
  const [token, setToken] = useState(0)

  useEffect(() => {
    const _token = localStorage.getItem('Authorization')
    setToken(_token)
  }, [])

  const [calendarValueOne, setCalendarValueOne] = useState(new Date())

  const [calendarValueTwo, setCalendarValueTwo] = useState('')
  const onChangeCalendar = (e) => {
    setCalendarValueOne(e)
  }
  const isClient = currUser?.type === 1
  return (
    <div className="payment">
      <h2 className="payment__title">{isClient ? 'Payments' : 'Withdraw'}</h2>
      <div className="wallet">
        <p className="wallet__title">Choose your wallet</p>
        <div className="wallet__row">
          {arr.map((i) => (
            <div className="wallet__block">
              <input type="radio" className="wallet__radio" id={i} name="payment-wallet" />
              <label htmlFor={i}>
                <img src="/icons/ppcom.svg" alt="" />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="withdrawal">
        <div className="withdrawal__row">
          <div className="withdrawal__block">
            <p className="withdrawal__title">Your balance</p>
            <p className="withdrawal__subtitle">{currUser?.talkens}</p>
          </div>
          <div className="withdrawal__block">
            <p className="withdrawal__title">{isClient ? 'Talkens amount' : 'Withdraw amount'}</p>
            <input
              type="number"
              value={value}
              className="withdrawal__input"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          {/* <span className="withdrawal__subtitle"> = </span> */}
          {/* <span className="withdrawal__subtitle"> 10$ </span> */}
          <div className="withdrawal__button">
            {isClient && value > 0 ? (
              <a className="btn-link" href={`http://api.dev.hugword.com/paypal/order/${value}?access-token=${token}`}>
                Submit
              </a>
            ) : (
              <Button>Submit</Button>
            )}
          </div>
        </div>
      </div>

      <h2 className="payment__title">Transactions</h2>K
      <div className="payment__row">
        <p className="payment__text">Choose a period:</p>
        <input
          type="text"
          placeholder="-"
          className="payment__input-period"
          value={convertFromTimeStampToDateWithoutTime(calendarValueOne)}
        />
        {/* <Calendar */}
        {/* onChange={onChangeCalendar} */}
        {/* value={calendarValueOne} */}

        {/* /> */}
        <input
          type="text"
          placeholder="-"
          className="payment__input-period"
          value={convertFromTimeStampToDateWithoutTime(calendarValueOne)}
        />
        {/* <Calendar */}
        {/* onChange={onChangeCalendar} */}
        {/* value={calendarValueOne} */}

        {/* /> */}
        <div className="payment__select-block">
          <p className="payment__text">Wallet:</p>
          <select>
            <option value="All">All</option>
            <option value="qiwi">Qiwi</option>
            <option value="Yandex">AlYandexl</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        <button className="btn btn_block btn-outline-primary" type="button">
          Filter
        </button>
      </div>

      <div className="payment__filter-statistic">
        <div className="payment__filter-statistic_overlay">
          <div className="payment__filter-statistic_block">
            <img src="./icons/ppcom_min.svg" alt="" className="payment__filter-statistic_block-img" />
            <span className="payment__filter-statistic_block-date">aug 04, 2020</span>
            <span className="payment__filter-statistic_block-time">12:08 PM</span>
            <div className="payment__block-status">
              <span className="payment__filter-statistic_block-status payment-success">Successful transaction</span>
              <span className="payment__filter-statistic_block-price">$250</span>
            </div>
          </div>
          <div className="payment__filter-statistic_block">
            <img src="./icons/ppcom_min.svg" alt="" className="payment__filter-statistic_block-img" />
            <span className="payment__filter-statistic_block-date">aug 04, 2020</span>
            <span className="payment__filter-statistic_block-time">12:08 PM</span>
            <div className="payment__block-status">
              <div>
                <span className="payment__filter-statistic_block-status payment-denied">Denied</span>
                <i className="payment__filter-statistic__tooltip" data-tooltip="Available after the first deposit">
                  {' '}
                  ?{' '}
                </i>
              </div>
              <span className="payment__filter-statistic_block-price">$1384</span>
            </div>
          </div>
        </div>
        <p className="payment__filter-statistic-total">
          Total: <span className="payment__filter-statistic_bold">$5876</span>
        </p>
      </div>
    </div>
  )
}

export default Payment
