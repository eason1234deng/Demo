import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as cx from 'classnames';
import * as actions from '../../actions/image';
import { compare } from '../../util/helpers';
import './styles.scss';

class FaceRecognition extends Component {
    render() {
        const {
            faceBoxes,
            draw,
            inputImageLink,
            topHovered,
            leftHovered,
        } = this.props.state;
        const { imageHover, imageUnhover } = this.props;
        let sortedFaceboxes = null;
        if (draw) {
            sortedFaceboxes = faceBoxes.sort(compare);
            sortedFaceboxes = sortedFaceboxes.map((box, i) =>
                <div className={cx(
                        'boundingBox',
                        (topHovered === -1 || (Math.abs(topHovered - box.topRow) < 0.1 &&
                            Math.abs(leftHovered - box.leftCol) < 0.1)) ? "" : "dimPic"
                    )}
                    key={box.topRow}
                    onMouseEnter={() => imageHover(box.topRow, box.leftCol)}
                    onMouseLeave={imageUnhover}
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol
                    }}>
                    <div className="concepts">
                        <div className="concept">
                            <span className="name" role="img" aria-label="Smily Emoji">🤩</span>
                            <span className="value">{i + 1}</span>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='center ma4'>
                <div className="absolute mt2">
                <img id="inputImage" src={inputImageLink} className="image" alt=""/>
                {sortedFaceboxes}
                </div>
            </div>
        )
    }
};

const mapeStateToProps = ({ image }) => {
    const { submittedImageLink, ...rest } = image;
    
    return { state: rest };
};

FaceRecognition.propTypes = {
    state: PropTypes.object.isRequired,
    imageHover: PropTypes.func.isRequired,
    imageUnhover: PropTypes.func.isRequired,
};

export default connect(mapeStateToProps, actions)(FaceRecognition);