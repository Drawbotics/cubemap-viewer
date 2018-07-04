import React from 'react';
import autobind from 'autobind-decorator';

import styles from '../styles/components/uploader';


class Uploader extends React.Component {
  render() {
    return (
      <div className={styles.uploader}>
        <div className={styles.body}>
          <div className={styles.title}>
            Select a cubemap
          </div>
          <input type="file" className={styles.uploadButton} onChange={this._handleUploadFile} />
        </div>
      </div>
    );
  }

  @autobind
  _handleUploadFile(e) {
    const { onFinishUpload } = this.props;
    const tgt = e.target || window.event.srcElement;
    const files = tgt.files;

    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        onFinishUpload(fr.result);
      }
      fr.readAsDataURL(files[0]);
    }
  }
}


export default Uploader;
