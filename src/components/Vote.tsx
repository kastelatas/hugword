import React from 'react'
import { useSelector } from 'react-redux'
import Rating from 'react-rating'
import InlineSVG from 'react-inlinesvg'
import starIcon from '../../public/icons/star-vote.svg'
import starIconFull from '../../public/icons/star-full.svg'

interface IVoteProps {
  placeholderRating: number
  readonly: boolean
}

const Vote: React.FC<IVoteProps> = (props) => {
  const { placeholderRating, readonly, viewReating } = props
  const selector = useSelector(({ ambassador: { ambassador } }) => ambassador)

  const handleRatingValue = (value) => {
    viewReating(value)
  }

  return (
    <Rating
      className="rating-stars"
      placeholderRating={placeholderRating}
      placeholderSymbol={<InlineSVG src={starIconFull} />}
      emptySymbol={<InlineSVG src={starIcon} />}
      fullSymbol={<InlineSVG src={starIconFull} />}
      fractions={2}
      readonly={readonly}
      onChange={handleRatingValue}
    />
  )
}

export default Vote
