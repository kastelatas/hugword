import React, {useEffect} from 'react'
import CommentsList from '@src/components/Comments/CommentsList'
import {useDispatch, useSelector} from 'react-redux'
import Sorting from '@src/components/Sorting'
import Vote from '@src/components/Vote'
import ProfileDegree from '@src/components/ProfivelDegree'
import IconButton from '@src/components/Button/IconButton'
import Button from '@src/components/Button/Button'
import { UserTypeConvertTooUrl } from '@src/ts/enum/user_enum'
import { useRouter } from 'next/router'
import { wrapper } from '@src/redux/store'
import { getAmbassadorById } from '@src/redux/actions/ambassador'
import closeIcoN from '../../../public/icons/close.svg'

const Reviews = ({ asModal, handleMenuLeft, data }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const goBack = () => router.back()

    // const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
    // const user = useSelector(({ auth: { user } }) => user)
    // const commentsCount = ambassador?.profile?.comments?.length
    // console.log(user)
    // useEffect(()=> {
    //     router?.query?.id &&  dispatch(getAmbassadorById(router?.query?.id, 'ambassador'))
    // },[router?.query?.id])

    return (
        <div className="reviews">
            <div className="reviews__header">
                {data?.profile?.cover?.path && (
                    <img
                        className="reviews__img"
                        src={`${process.env.API_IMG_URL}${data?.profile?.cover?.path}`}
                        alt="img"
                    />
                )}
                <div className="reviews__row reviews__row-abs">
                    <div className="reviews__col">
                        <div className="reviews__img-cont">
                            {data?.profile?.photo?.path && (
                                <img
                                    className="reviews__img"
                                    src={`${process.env.API_IMG_URL}${data?.profile?.photo?.path}`}
                                    alt="img"
                                />
                            )}
                        </div>
                        <div className="reviews__header-col">
                            <p className="reviews__header-name">{data?.profile?.name}</p>
                            <Vote placeholderRating={data?.profile?.rating?.rating} readonly />
                        </div>
                        {/*<ProfileDegree />*/}
                        <div className="reviews__btn-close">
                            <IconButton close icon={closeIcoN} onClick={asModal ? handleMenuLeft : goBack} />
                            {/**/}
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews__row reviews__row-pd reviews__pd-content">
                {/*<p className="reviews__text">Reviews({commentsCount})</p>*/}
                <Sorting />
            </div>
            <div className="reviews__list reviews__pd-content">
                <CommentsList comments={data?.profile?.comments} ava isReviews />
            </div>
            <div className="reviews__row">
                <div className="reviews__btn-block">
                    <Button to="/user-profile" as="/user-profile">
                        Back to Profile
                    </Button>

                    <Button onClick={asModal ? handleMenuLeft : goBack}>Leave a Review</Button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, res, params }) => {
    // await store.dispatch(getAmbassadorById(params?.id, 'ambassador'))
})

export default Reviews
