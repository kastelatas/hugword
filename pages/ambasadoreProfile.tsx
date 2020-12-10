import React from 'react'
import SVG from 'react-inlinesvg'
import * as SideBar from "@src/components/layouts/SideBar";
import IconButton from "@src/components/Button/IconButton";
import sunIcon from "../public/icons/sun.svg";
import PushCardList from "@src/components/PushCardList";

const IndexPage = () => {
  return (
    <main className="main">

      <aside className="sidebar-left">

        <div className="input-group input-group_accent">

          <input type="text" placeholder="Search"/>
          <span className="input-group__append">
                <button className="btn-icon btn-icon_type_add " type="button">
                  <div className="btn-icon__content">
                  <SVG src="/icons/plus-grey.svg"/>
                  </div>
                </button>
              </span>
        </div>

        <div className="sidebar-left__content">

          <div className="sidebar-left__ltr">

            <nav className="tabs-nav">
              <ul className="tabs-nav__container">
                <li className="tabs-nav__item">chats</li>
                <li className="tabs-nav__item tabs-nav__item_active">favorite</li>
              </ul>
            </nav>

            <div className="contacts-group">

              <div className="contact">
                <div className="ava ava_sm ava_online ">
                  <img className="ava__img" src="Layer691.png" alt="img"/>
                </div>
                <div className="contact__content">
                  <div className="contact__title">Martin Morrison</div>
                  <div className="contact__message">How are you doing? sdfsdf sdf sdf sdf</div>
                </div>
                <div className="contact__info">
                  <div className="counts">9+</div>
                  <div className="contact__date">5 mins</div>
                </div>
              </div>
              <div className="contact">
                <div className="ava ava_sm ava_online ">
                  <img className="ava__img" src="Layer691.png" alt="img"/>
                </div>
                <div className="contact__content">
                  <div className="contact__title">Martin Morrison</div>
                  <div className="contact__message">How are you doing? sdfsdf sdf sdf sdf</div>
                </div>
                <div className="contact__info">
                  <div className="counts">9+</div>
                  <div className="contact__date">5 mins</div>
                </div>
              </div>
              <div className="contact">
                <div className="ava ava_sm ava_online ">
                  <img className="ava__img" src="Layer691.png" alt="img"/>
                </div>
                <div className="contact__content">
                  <div className="contact__title">Martin Morrison</div>
                  <div className="contact__message">How are you doing? sdfsdf sdf sdf sdf</div>
                </div>
                <div className="contact__info">
                  <div className="counts">9+</div>
                  <div className="contact__date">5 mins</div>
                </div>
              </div>
              <div className="contact">
                <div className="ava ava_sm ava_online ">
                  <img className="ava__img" src="Layer691.png" alt="img"/>
                </div>
                <div className="contact__content">
                  <div className="contact__title">Martin Morrison</div>
                  <div className="contact__message">How are you doing? sdfsdf sdf sdf sdf</div>
                </div>
                <div className="contact__info">
                  <div className="counts">9+</div>
                  <div className="contact__date">5 mins</div>
                </div>
              </div>
              <div className="contact">
                <div className="ava ava_sm ava_online ">
                  <img className="ava__img" src="Layer691.png" alt="img"/>
                </div>
                <div className="contact__content">
                  <div className="contact__title">Martin Morrison</div>
                  <div className="contact__message">How are you doing? sdfsdf sdf sdf sdf</div>
                </div>
                <div className="contact__info">
                  <div className="counts">9+</div>
                  <div className="contact__date">5 mins</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </aside>

      <section className="main-section">
        <header className="header">

          <a href='#' className="logo">
            <SVG src="/icons/logo.svg"/>
          </a>

          <nav className="nav">
            <ul className="nav__container">
              <li className="nav__item"><a className="nav__link" href="">Hug Search</a></li>
              <li className="nav__item nav__item_active"><a className="nav__link" href="">chat room</a></li>
              <li className="nav__item"><a className="nav__link" href="">Help Center</a></li>
            </ul>
          </nav>

          <div className="header__item">

            <div className="notification">
              <button className="btn-icon">
                <SVG src="/icons/bell.svg"/>
              </button>
            </div>

            <div className="auth">
              <div className="ava ava_online ava_sm">
                <img className="ava__img" src="Layer691.png" alt="img"/>
              </div>
              <div className="auth__wrapper">
                <span className="auth__name">Johnathan</span>
                <span className="auth__status">
                Status: <span className="profile__status-marked">Platinum</span>
              </span>
              </div>
              <div className="auth__icon">
                <button className="btn-icon">
                  <SVG src="/icons/arrow-down.svg"/>
                </button>
              </div>
            </div>

          </div>

        </header>

        <div className="profile">

          <div className="profile__header">
            <img className="profile__img"
                 src="https://images.wallpaperscraft.ru/image/neboskreby_panorama_ogni_goroda_126505_3840x2160.jpg"
                 alt="img"/>
            <button className="btn-icon btn-icon_type_close" type="button">
              <div className="btn-icon__content">
                <SVG src="/icons/close.svg"/>
              </div>
            </button>
            <button className="btn btn_change btn_icon" type="button">
              <SVG src="/icons/camera.svg"/>
              <span>Change Photo</span>
            </button>
          </div>
          <div className="profile__wrapper">

            <div className="profile__content">

              <div className="profile__about">

                <div className="profile__person">
                  <img className="profile__img" src="/img/ambasador.png" alt="img"/>
                  <button className="btn btn_change btn_icon" type="button">
                    <SVG src="/icons/camera.svg"/>
                    <span>Change Photo</span>
                  </button>
                </div>

                <div className="profile__aside">

                  <div>

                    <h3 className="profile__title">About Valery</h3>

                    <p className="profile__text">Here are some words about me! I am often told that I am kind.
                      I can always listen to a person,
                      console him and give practical advice. Friends even call me "Ambulance" because I know what needs
                      to
                      be said to ease the mental suffering of a person. I think well and quickly learn.
                    </p>

                    <div className="profile__decription">
                      <div className="profile__icon">
                        <SVG src='/icons/main-billing.svg'/>
                      </div>
                      <span className="profile__decription-text">Cost of one massage:
                      <span className="profile__decription-mark">1 talken</span></span>
                    </div>

                  </div>

                  {/*<div className="profile__action">*/}
                  {/*  <button className="btn btn_icon">*/}
                  {/*    <SVG src='/icons/speech-bubble.svg'/>*/}
                  {/*    <span>Start chat</span>*/}
                  {/*  </button>*/}
                  {/*</div>*/}

                </div>

              </div>

              <h3 className="profile__title">Valery photos</h3>
              <div className="carousel">
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
              </div>

              <div className="gallery">
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
                <div className="photo">
                  <img className="photo__img" src="/img/Layer2691.png"/>
                </div>
                <button className="btn-icon btn-icon_type_add-ring" type="button">
                      <span className="btn-icon__content">
                      <SVG src="/icons/plus-grey.svg"/>
                      </span>
                </button>
              </div>

              <div className="profile__present">

                <div className="ava ava_rectangle">
                  <img className="ava__img" src="/img/Layer2691.png"/>
                  <button className="btn btn_change btn_icon" type="button">
                    <SVG src="/icons/camera.svg"/>
                    <span>Change Photo</span>
                  </button>
                </div>
                <div className="ava ava_lg">
                  <img className="ava__img" src="/img/Layer2691.png"/>
                </div>
                <div className="ava">
                  <img className="ava__img" src="/img/Layer2691.png"/>
                </div>
                <div className="ava ava_sm">
                  <img className="ava__img" src="/img/Layer2691.png"/>
                </div>

              </div>

              <h3 className="profile__title">Valery videos</h3>

              <div className="video-gallery">
                <div className="video-gallery__content">
                  <div className="video"></div>
                  <div className="video"></div>
                  <div className="video"></div>
                  <div className="video"></div>
                  <div className="video video_add">
                    <button className="btn-icon btn-icon_type_add-ring" type="button">
                      <span className="btn-icon__content">
                      <SVG src="/icons/plus-grey.svg"/>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="profile__title">Topics of conversation</h3>

              <div className="tags-block">
                <div className="tag">Fashion</div>
                <div className="tag">Healthy life style</div>
                <div className="tag">Relationship tips and dating advice</div>
                <div className="tag">Vegan and eco living</div>
                <div className="tag">Movies</div>
                <div className="tag">Vegan and eco living</div>
                <div className="tag">Blogers and celebritis</div>
                <div className="tag">Blogers and celebritis</div>
                <div className="tag">Chat</div>
                <div className="tag">Meditation & Yoga</div>
              </div>

              <div className="tags-block">
                <div className="tag tag_close">
                  <span>Fashion</span>
                  <button className="btn-icon" type="button">
                    <SVG src="/icons/plus-grey.svg"/>
                  </button>
                </div>
                <div className="tag tag_close">
                  <span>Vegan and eco living</span>
                  <button className="btn-icon" type="button">
                    <SVG src="/icons/plus-grey.svg"/>
                  </button>
                </div>
                <div className="tag tag_close">
                  <span>Healthy life style</span>
                  <button className="btn-icon" type="button">
                    <SVG src="/icons/plus-grey.svg"/>
                  </button>
                </div>
                <div className="tag tag_close">
                  <span>Relationship tips and dating advice</span>
                  <button className="btn-icon" type="button">
                    <SVG src="/icons/plus-grey.svg"/>
                  </button>
                </div>
                <button className="btn-icon btn-icon_type_add-ring" type="button">
                      <span className="btn-icon__content">
                      <SVG src="/icons/plus-grey.svg"/>
                      </span>
                </button>
              </div>

              <div className="profile__action">
                <button className="btn btn_block" type="button">Cancel</button>
                <button className="btn btn_block" type="button">Save</button>
              </div>
            </div>

            <div className="profile__comments">
              <div className="profile__title">Reviews (52)</div>
              <div className="profile__comments-content">
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
                <div className="comment">
                  <div className="comment__header">
                    <div className="ava ava_sm">
                      <img className="ava__img" src="Layer691.png" alt="img"/>
                    </div>
                    <div className="comment__wrapper">
                      <div className="comment__title">
                        <div className="comment__name">Diego Luna</div>
                        <div className="comment__date">10/22/2020</div>
                      </div>
                      <div className="stars" data-rating="3"/>
                    </div>
                    <div className="comment__title"></div>
                  </div>
                  <div className="comment__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                    quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

      <SideBar.RightSidebar>
        <SideBar.RightSidebarHeader>
          <span className="sidebar-right__header-text">Day</span>
          <IconButton sun icon={sunIcon} />
        </SideBar.RightSidebarHeader>
      </SideBar.RightSidebar>

      {/*<aside className="sidebar-right">

        <div className="sidebar-right__header">
          <span className="sidebar-right__header-text">Day</span>
          <button className="btn-icon btn-icon_type_sun ">
            <span className="btn-icon__content"><SVG src="/icons/sun.svg"/></span>
          </button>
        </div>


      </aside>*/}
    </main>
  )
}

export default IndexPage
