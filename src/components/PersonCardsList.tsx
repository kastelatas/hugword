import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import PersonCard from './PersonCard'

const PersonCardsList = () => {
  const ambassadorList = useSelector(({ ambassador }) => ambassador)
  const [countAmbassadorList, setCountAmbassadorList] = useState(false)

 // useEffect(()=> {
 //   if (ambassadorList.list.length <= 3) {
 //     setCountAmbassadorList(!countAmbassadorList)
 //   }
 // },[ambassadorList])

  const root = classNames('persons-block__list', {
    'persons-block__list_grid': countAmbassadorList,
  })

  return (
   <div className='persons-block__overlay'>
     <div className={root}>
       {ambassadorList?.list.map((i) => (
           <PersonCard key={i.id} {...i} />
       ))}
     </div>
   </div>
  )
}

export default PersonCardsList
