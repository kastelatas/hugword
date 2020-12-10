/*
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import InlineSVG from 'react-inlinesvg'
import { imgUpload, updateImg, clearData } from '@src/redux/actions/user'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import Button from '@src/components/Button/Button'
import classNames from 'classnames'
import { setState } from 'expect/build/jestMatchersObject'
import imgSpinner from '../../../public/icons/img-spinner.svg'
import uploadIcon from '../../../public/icons/upload-icon.svg'

const pixelRatio = 4

function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

const FileUploadModalContent = ({ imgType }) => {
  const [upImg, setUpImg] = useState()
  const [imgCrop, setImgCrop] = useState({
    src: null,
    crop: {
      unit: '%',
      x: 25,
      y: 25,
      width: 48,
      height: 48,
    },
  })
  const dispatch = useDispatch()
  const imgData = useSelector(({ user: { data } }) => data)
  const dataLoading = useSelector(({ user: { dataLoading } }) => dataLoading)
  const user = useSelector(({ auth: { user } }) => user)
  const modal = useSelector(({ modals: { modalType } }) => modalType)
  const isImgLoad = Object.keys(imgData).length
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [completedCrop, setCompletedCrop] = useState(null)
  const [file, setFile] = useState(null)

  const img = classNames('modal__img', {
    modal__img_type_cover: modal.imgType === 'cover_id',
  })

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setUpImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
      setFile(URL.createObjectURL(event.target.files[0]))
    }
  }


  const getResizedCanvas = ( crop) => {
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height
    const tmpCanvas = document.createElement("canvas")
    tmpCanvas.width = Math.ceil(crop.width*scaleX)
    tmpCanvas.height = Math.ceil(crop.height*scaleY)
    const ctx = tmpCanvas.getContext("2d");
    const image = imgRef.current;
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width*scaleX,
      crop.height*scaleY,
    )

    return tmpCanvas;
  }

  const imgUpdate = () => {
    const imgs = user && user.profile.photos.map((i) => ({ image_id: i.image_id }))
    if (modal.imgType === 'videos') {
      const videos =
        user && Boolean(user?.profile?.videos?.length) ? user.profile.videos.map((i) => ({ id: i.id })) : []
      return dispatch(
        updateImg(user?.id, UserTypeToString[user.type], {
          [`${modal.imgType}`]: [...videos, { video_id: imgData?.id }],
        }),
      )
    }

    getResizedCanvas(imgCrop)
    dispatch(imgUpload(upImg, completedCrop, user?.id, UserTypeToString[user.type], modal.imgType, imgs))
  }

  const onImageLoaded = useCallback((img) => {
    imgRef.current = img
  }, [])

  const onCropChange = (crop) => {
    setImgCrop({ ...imgCrop, crop })
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingEnabled = false

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )
  }, [completedCrop])


  return (
    <>
      {!file ? (
        <>
          <span>
            <div className="modal__upload-section">
              <div className="modal__spinner-wrapper">{dataLoading && <InlineSVG src={imgSpinner} />}</div>
              <InlineSVG src={uploadIcon} />
            </div>
            <div style={{ marginBottom: 34 }}>
              <h2 className="modal__title-gross">DRAG & DROP</h2>
              <span className="modal__description">your document, or</span>
              <label htmlFor="file-upload" className="custom-file-upload">
                Browse
              </label>
              <input id="file-upload" type="file" onChange={onSelectFile} accept="image/!*" />
            </div>
          </span>
          <span className="modal__text modal__text_type_large">Upload your photo</span>
          <span className="modal__text modal__text_type_large">(jpg or png, not more than </span>
          <span className="modal__text modal__text_type_large">400 Kbyte)</span>
          <div className="modal__actions">
            {/!* <Button disabled={!upImg} onClick={() => dispatch(imgUpload(upImg))}> *!/}
            {/!*  Next *!/}
            {/!* </Button> *!/}
          </div>
        </>
      ) : (
        <>
          <div className={img}>
            {/!* <img className="ava__img" src={`${process.env.API_IMG_URL}${imgData?.path}`} /> *!/}
            <ReactCrop
              src={file}
              crop={imgCrop.crop}
              onImageLoaded={onImageLoaded}
              onComplete={(c) => setCompletedCrop(c)}
              onChange={onCropChange}
            />
          </div>
          <h3 className="modal__title" style={{ margin: 0 }}>
            Adjust the position of your photography (for Hug Search page)
          </h3>
          <div className="modal__actions">
            <Button onClick={() => setFile(null)}>Back</Button>
            <Button onClick={imgUpdate}>Finish</Button>
          </div>
        </>
      )}
    </>
  )
}

export default FileUploadModalContent
*/
import { awaitExpression } from "@babel/types";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

import {useState} from 'react'
import React from "react";
import Cropper from "react-cropper";
import { imgUpload, updateImg, clearData } from '@src/redux/actions/user'
import InlineSVG from 'react-inlinesvg'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import imgSpinner from '../../../public/icons/img-spinner.svg'
import uploadIcon from '../../../public/icons/upload-icon.svg'
import classNames from 'classnames'

export const Demo: React.FC = () => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null)
  const [cropper, setCropper] = useState<any>();
  const onChange = (e: any) => {
    e.preventDefault()
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };
  const dataLoading = useSelector(({ user: { dataLoading } }) => dataLoading)
  // const user = useSelector(({ auth: { user } }) => user)
  const user = useSelector(({ profile: { userProfile } }) => userProfile)
  const dispatch = useDispatch()
  const modal = useSelector(({ modals: { modalType } }) => modalType)

  const img = classNames('modal__img', {
    modal__img_type_cover: modal.imgType === 'cover_id',
  })


  const getCropData = async () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  }

  const imgUpdate = () => {
    const imgs = user && user.profile.photos.map((i) => ({ image_id: i.image_id }))
    if (modal.imgType === 'videos') {
      const videos =
        user && Boolean(user?.profile?.videos?.length) ? user.profile.videos.map((i) => ({ id: i.id })) : []
      return dispatch(
        updateImg(user?.id, UserTypeToString[user.type], {
          [`${modal.imgType}`]: [...videos, { video_id: imgData?.id }],
        }),
      )
    }
    getCropData().then(
      dispatch(imgUpload(cropData, user?.id, UserTypeToString[user.type], modal.imgType, imgs))
    )
  }



  if (cropData) {
    return (
      <>
       <div className="modal__img-croped">
         <img style={{ width: "100%" }} src={cropData} alt="cropped" />
       </div>
        <div className="modal__actions">
          <Button onClick={() => setCropData(null)}>Back</Button>
          <Button onClick={imgUpdate}>Finish</Button>
        </div>
      </>
    )
  }



  return (
    <>
      { !image ?
        <>
          <span>
            <div className="modal__upload-section">
              <div className="modal__spinner-wrapper">{(dataLoading ) && <InlineSVG src={imgSpinner} />}</div>
              <InlineSVG src={uploadIcon} />
            </div>
            <div style={{ marginBottom: 34 }}>
              <h2 className="modal__title-gross">DRAG & DROP</h2>
              <span className="modal__description">your document, or</span>
              <label htmlFor="file-upload" className="custom-file-upload">Browse</label>
              <input id="file-upload" type="file" onChange={onChange} accept="image/!*" />
            </div>
          </span>
          <span className="modal__text modal__text_type_bold">Upload your photo</span>
          <span className="modal__text modal__text_type_large">(jpg or png, not more than </span>
          <span className="modal__text modal__text_type_large">5 Mb)</span>
          <div className="modal__actions">
          </div>
        </> :
        <>
          <div className={img}>
            <Cropper
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </div>
          <h3 className="modal__title" style={{ margin: 0 }}>
            Adjust the position of your photography (for Hug Search page)
          </h3>
          <div className="modal__actions">
            <Button onClick={() => {setImage(null)}}>Back</Button>
            <Button onClick={getCropData}>Next</Button>
          </div>
        </>
      }

      <div>
        {/*<div className="box" style={{ width: "50%", float: "right" }}>*/}
        {/*  <h1>Preview</h1>*/}
        {/*  <div*/}
        {/*    className="img-preview"*/}
        {/*    style={{ width: "100%", float: "left", height: "300px" }}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div
          className="box"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>*/}
      </div>
    </>
  );
};

export default Demo;
