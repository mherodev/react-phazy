import React from 'react';
import PropTypes from 'prop-types';

import LazyLoad from 'react-lazy-load';
import classNames from 'classnames';
import BlurImage from 'react-blur';

class Phazy extends React.Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isImageLoaded: false,
      isPreviewLoaded: false,
    };

    this.onLoadPreview = this.onLoadPreview.bind(this);
    this.onLoadImage = this.onLoadImage.bind(this);
  }

  onLoadPreview() {
    this.setState({ isPreviewLoaded: true });
  }

  onLoadImage() {
    this.setState({ isImageLoaded: true });
  }

  render() {
    const { source, preview, alt, width, height, ...rest } = this.props;

    const placeholderPadding = height / width * 100;

    const previewClass = classNames('phazy__preview', {
      'is-loaded': this.state.isPreviewLoaded,
    });
    const imageClass = classNames('phazy__image', {
      'is-loaded': this.state.isImageLoaded,
    });

    return (
      <figure className="phazy" {...rest}>
        <div
          className="phazy__placeholder"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: `${width}px`,
            maxHeight: `${height}px`,
          }}
        >
          <div
            className="phazy__background"
            style={{ paddingBottom: `${placeholderPadding}%` }}
          />
          <LazyLoad height={height} offset={height} debounce={false}>
            <div>
              <BlurImage
                className={previewClass}
                img={preview}
                onLoadFunction={this.onLoadPreview}
                blurRadius={20}
              />
              {this.state.isPreviewLoaded &&
                <img
                  className={imageClass}
                  src={source}
                  alt={alt}
                  onLoad={this.onLoadImage}
                />}
            </div>
          </LazyLoad>
        </div>
      </figure>
    );
  }
}

export default Phazy;
