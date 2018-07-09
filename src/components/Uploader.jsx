import React from 'react';
import autobind from 'autobind-decorator';
import queryString from 'query-string';

import styles from '../styles/components/uploader';


function replaceString(string) {
  if (string.includes('discordapp') && string.includes('cdn')) {
    return string.replace('cdn', 'media').replace('com', 'net');
  }
  return string;
}


class Uploader extends React.Component {
  state = {
    url: null,
  }

  render() {
    const { url } = this.state;
    return (
      <div className={styles.uploader}>
        <div className={styles.body}>
          <div className={styles.title}>
            Select a cubemap
          </div>
          <input type="file" className={styles.uploadButton} onChange={this._handleUploadFile} />
          <div className={styles.title}>
            OR
          </div>
          <div className={styles.form}>
            <label>
              Paste url:
              <input
                type="text"
                className={styles.input}
                placeholder="Image url"
                onChange={(e) => this.setState({ url: e.target.value })} />
            </label>
            <button className={styles.button} onClick={this._handleSubmit}>Load</button>
          </div>
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

  @autobind
  _handleSubmit() {
    const { url } = this.state;
    const { onFinishUpload } = this.props;
    const parsed = queryString.parseUrl(url);
    const replaced = replaceString(parsed.url);
    const params = new URLSearchParams(location.search);
    params.set('cubemap', replaced);
    window.history.replaceState({}, '', `${location.pathname}?${params}`);

    onFinishUpload(replaced);
  }
}


export default Uploader;
