/* eslint-disable */

import React from 'react'
import Dropzone from 'react-dropzone'

const FileDropZone = (props) => {

  let onDrop = (files) => (
    this.setState({
      files: files
    })
  )

  return (
    <div>
      <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={onDrop} className='imgbrowser' activeClassName="activiImgbrowser" >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    </div>
    )
}

export default FileDropZone
