import React from 'react';
import 'tourama/dist/vendor.js';
import 'tourama/dist/tourama.styles.css';
import { Tourama } from 'tourama';
import autobind from 'autobind-decorator';

import Uploader from '../components/Uploader';

import styles from '../styles/containers/viewer';


class Viewer extends React.Component {
  state = {
    config: {
      TITLE: 'Cubemap viewer',
      STARTING_SCENE: 'cubemap',
      VERSION: 'dev',
      THEME: 'default',
      UI_OPTIONS: {},
      SCENES: {},
    },
    uploadVisible: true,
  }

  componentDidMount() {
    const params = new URLSearchParams(location.search);
    const cubemapUrl = params.get('cubemap');
    if (cubemapUrl) {
      this._handleFinishUpload(cubemapUrl);
    }
  }

  render() {
    const { container, config, uploadVisible, reload } = this.state;
    const { SCENES } = config;
    return (
      <div className={styles.container} ref={(container) => this._handleFrameMount(container)}>
        {do{
          if (uploadVisible) {
            <Uploader onFinishUpload={this._handleFinishUpload} />
          }
        }}
        {do{
          if (container && SCENES.cubemap && ! uploadVisible) {
            <>
              <div className={styles.upload} onClick={() => this.setState({ uploadVisible: true })}>
                Change image
              </div>
              <Tourama key={reload} config={config} container={container}>
                {true}
              </Tourama>
            </>
          }
        }}
      </div>
    );
  }

  @autobind
  _handleFrameMount(containerElement) {
    const { container } = this.state;
    if (! container) {
      this.setState({ container: containerElement });
    }
  }

  @autobind
  _handleFinishUpload(url) {
    this.setState({
      uploadVisible: false,
      reload: Math.random(),
      config: {
        ...this.state.config,
        SCENES: {
          cubemap: {
            name: 'scene',
            images: url,
            startingPos: {
              x: 0,
              y: 0,
            },
            hotspots: {},
          },
        },
      },
    });
  }
}


export default Viewer;
