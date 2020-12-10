import React from 'react'
import AchievementsList from '@src/components/Achievements/AchievementsList'
import RadialProgressBar from '@src/components/ProgressBars/RadialProgressBar'
import InlineSVG from 'react-inlinesvg'
import starIcon from '../../../public/icons/star-full.svg'
import achiveIcon from '../../../public/icons/achive-stat-icon.svg'

const ProfileAchievment = ({user}) => {
  return (
    <div className="profile-achievement">
      <div className="overlay-progress">
        <h4 className="profile-statistics__title">Your Overall Progress</h4>
        {/*<RadialProgressBar />*/}
        <div className="stats-grid">
          {/*<div className="stats-grid__row">*/}
          {/*  <div className="stats-grid__col">*/}
          {/*    <div className="stats-grid__counter">*/}
          {/*      <span>48</span>*/}
          {/*      <span> Last mounth</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="stats-grid__col">*/}
          {/*    <div className="stats-grid__counter">*/}
          {/*      <span>69</span>*/}
          {/*      <span>Last week</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {
            user
              ? <div className="stats-grid__row">
                  <div className="stats-grid__achiv">
                    <div
                        className="stats-grid__achiv_block"
                        data-tooltip="Lorem ipsum doleores ammet ipsum doleores ammet ipsum doleores ammet"
                    >
                      <InlineSVG src={achiveIcon} />
                    </div>
                    <span>18</span>
                  </div>
                </div>
              :<div className="stats-grid__row">
                <div className="stats-grid__achiv">
                  <div
                      className="stats-grid__achiv_block"
                      data-tooltip="Lorem ipsum doleores ammet ipsum doleores ammet ipsum doleores ammet"
                  >
                    <InlineSVG src={starIcon} />
                  </div>
                  <span>18</span>
                </div>
                <div className="stats-grid__achiv">
                  <div
                      className="stats-grid__achiv_block"
                      data-tooltip="Lorem ipsum doleores ammet ipsum doleores ammet ipsum doleores ammet"
                  >
                    <InlineSVG src={achiveIcon} />
                  </div>
                  <span>18</span>
                </div>
              </div>
          }
        </div>
      </div>
      <div className="profile-achievement__container">
        <div className="profile-achievement__row profile-achievement__mx-height">
          <AchievementsList />
        </div>
      </div>
    </div>
  )
}

export default ProfileAchievment
