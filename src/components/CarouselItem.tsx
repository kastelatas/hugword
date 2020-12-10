import React from "react";
import CarouselMulti from "react-multi-carousel";
import Ava from "@src/components/Ava";
import IconButton from "@src/components/Button/IconButton";
import speecheIcon from "../../public/icons/speech-bubble.svg";
import {UserTypeToString} from "@src/ts/enum/user_enum";
import arrowLeftIcon from "../../public/icons/arrow-left.svg";
import arrowRightIcon from "../../public/icons/arrow-right.svg";

const CarouselItem = ({data, numberOfCards}) => {


    const miniProfileResponsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 0},
            items: 1,
            partialVisibilityGutter: 30,
        },
    }


    const CustomButtonGroupAsArrows = ({next, previous, goToSlide, ...rest}) => {
        const {
            carouselState: {currentSlide},
        } = rest

        return (
            <div className="carousel__button-group carousel-item__button-group">
                <IconButton
                    icon={arrowLeftIcon}
                    className={currentSlide === 0 ? 'disable carousel__button-left' : 'carousel__button-left'}
                    onClick={() => previous()}
                />

                <IconButton onClick={() => next()} icon={arrowRightIcon} className="carousel__button-right"/>
            </div>
        )
    }


    return (
        <div className="carousel carousel-item">
            {data && (
                <CarouselMulti
                    renderButtonGroupOutside
                    customButtonGroup={<CustomButtonGroupAsArrows/>}
                    responsive={miniProfileResponsive}
                    infinite={false}
                    partialVisible={false}
                    ssr={false}
                    renderDotsOutside={false}
                    showDots={true}
                    arrows={false}
                    slidesToSlide={1}

                >
                    {data?.map((i) => {
                        return (
                            <div className="carousel-item__card" >
                                <img src={i.img} alt=""/>
                            </div>
                        )
                    })}
                </CarouselMulti>
            )}
        </div>
    )
}

export default CarouselItem;