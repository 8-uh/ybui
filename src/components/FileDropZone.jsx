/* eslint-disable */

import React from 'react'
var Dropzone = require('react-dropzone')

const FileDropZone = (props) => {
  return (
    <div>
      <Dropzone className='imgbrowser'>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    </div>
    )
}

export default FileDropZone
