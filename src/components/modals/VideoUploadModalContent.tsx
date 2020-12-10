import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SVG from 'react-inlinesvg'
import { closeModal } from '@src/redux/actions/modals'
import { updateImg, uploadVideo, updateVideo, updateVideoFile } from '@src/redux/actions/user'
import * as FormControl from '@src/components/Form'
import InlineSVG from 'react-inlinesvg'
import Button from '@src/components/Button/Button'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import imgSpinner from '../../../public/icons/img-spinner.svg'
import uploadIcon from '../../../public/icons/upload-icon.svg'

export const VideoUploadModalContent: React.FC = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [uploadFIle, setUploadVideo] = useState(false)
  const dataLoading = useSelector(({ user: { dataLoading } }) => dataLoading)
  const videoDataLoading = useSelector(({ user: { videoDataLoading } }) => videoDataLoading)
  const videoData = useSelector(({ user: { VideoData } }) => VideoData)
  const modal = useSelector(({ modals: { modalType } }) => modalType)
  const user = useSelector(({ auth: { user } }) => user)

  const onSelectFile = async (e) => setFile(e.target.files[0])

  const VideoUpload = () => {
    const videos = user && Boolean(user?.profile?.videos?.length) ? user.profile.videos.map((i) => ({ id: i.id })) : []
    file && setUploadVideo(!uploadFIle)
    dispatch(uploadVideo(user?.id, file, videos))
  }

  const VideoUpdate = () => {
    /* const videos =
            user && Boolean(user?.profile?.videos?.length) ? user.profile.videos.map((i) => ({id: i.id})) : []
      dispatch(updateVideo(user?.id, file, videos)) */
    // return dispatch(
    //       updateVideoFile(user?.id, UserTypeToString[user.type], {
    //           videos: [...videos, {video_id: videoData?.id}],
    //       }),
    //   )
  }
  return (
    <>
      <span>
        <div className="modal__upload-section">
          <div className="modal__spinner-wrapper">{videoDataLoading && <InlineSVG src={imgSpinner} />}</div>
          <InlineSVG src={uploadIcon} />
        </div>
        {file && (
          <span className="modal__text modal__text_type_large" style={{ marginBottom: 14 }}>
            {file.name}
          </span>
        )}{' '}
        <br />
        <div style={{ marginBottom: 34 }}>
          <h2 className="modal__title-gross">DRAG & DROP</h2>
          <span className="modal__description">your document, or</span>
          <label htmlFor="file-upload" className="custom-file-upload">
            Browse
          </label>
          <input id="file-upload" type="file" name="file" onChange={onSelectFile} accept="video/*" />
        </div>
      </span>
      <span className="modal__text modal__text_type_large">Upload your video</span>
      <div className="modal__actions">
        <Button onClick={VideoUpload}>OK</Button>
        {/* {uploadFIle ?  <Button onClick={VideoUpdate}>Finish</Button> : true} */}
      </div>
    </>
  )
}

export default VideoUploadModalContent
