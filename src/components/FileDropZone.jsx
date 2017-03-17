/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

var componentConfig = {
  iconFiletypes: ['.jpg', '.png', '.gif'],
  postUrl: 'http://localhost:8000/asset/upload'
};
var djsConfig = { autoProcessQueue: true }

const FileDropZone = (props) => {
  require('../../node_modules/react-dropzone-component/styles/filepicker.css');
  require('../../node_modules/dropzone/dist/min/dropzone.min.css');


  const eventHandlers = {
      complete: props.onfileUpload.bind(this)
  }

  return (
    <DropzoneComponent className='imgbrowser' config={componentConfig}
    eventHandlers={eventHandlers}
    djsConfig={djsConfig} />
  );
}

export default FileDropZone
