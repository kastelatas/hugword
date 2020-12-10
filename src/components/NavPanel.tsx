import React from 'react'
import CheckBox from '@src/components/CheckBox'
import Sorting from '@src/components/Sorting'
import { useDispatch, useSelector } from 'react-redux'
import { searchAmbassadors, setFilter } from '@src/redux/actions/ambassador'
import classNames from 'classnames'
import { getTopicsList } from "@src/redux/actions/user";

const Nav = () => {
  const dispatch = useDispatch()
  const filterData = useSelector(({ ambassador: { filter } }) => filter)

  const handleSearch = (val) => {
    const obj = {
      ...filterData,
      profile: {
        ...filterData.profile,
        gender: val,
      },
    }
    dispatch(searchAmbassadors(obj))
    dispatch(setFilter(obj))
  }

  const handleClick = () => {
    const obj = {
      ...filterData,
      state: {
        online: !filterData.state.online,
      },
    }
    dispatch(searchAmbassadors(obj))
    dispatch(setFilter(obj))
  }

  const handleSorting = (val) => {
    const obj = {
      ...filterData,
      // sorting: val
    }
    dispatch(searchAmbassadors(filterData, val))
    // dispatch(setFilter(obj))
  }


  return (
    <div className="nav-panel">
      <CheckBox labelText="Online only" isChecked={filterData.state.online} onClick={handleClick} />
      <nav className="tabs-nav">
        <ul className="tabs-nav__container">
          <li
            className={classNames('tabs-nav__item', { 'tabs-nav__item_active': filterData.profile.gender === null })}
            onClick={() => handleSearch(null)}
          >
            all
          </li>
          <li
            className={classNames('tabs-nav__item', { 'tabs-nav__item_active': filterData.profile.gender === 2 })}
            onClick={() => handleSearch(2)}
          >
            only women
          </li>
          <li
            className={classNames('tabs-nav__item', { 'tabs-nav__item_active': filterData.profile.gender === 1 })}
            onClick={() => handleSearch(1)}
          >
            only man
          </li>
        </ul>
      </nav>
      <Sorting type='rating' handleSorting={handleSorting} />
    </div>
  )
}

export default Nav
