import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/image';
import './styles.scss';

class ImageLinkForm extends Component {
    render() {
        const { credits, imageSetLink, imageDetectFace } = this.props;
        return (
            <div>
                <p className='f3'>
                    This Magic Brain will Detect Faces in Your Pictures. Give It a Try
            </p>
                <div className="center">
                    <div className="form center pa4 br3 shadow-5">
                        <input type="text" className="f4 pa2 w-70" onChange={imageSetLink} />
                        <button className="w-30 grow f4 link ph3 pv dib white bg-light-purple" onClick={imageDetectFace} disabled={credits <= 0}>Detect</button>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({ user }) => ({ credits: user.credits });

ImageLinkForm.propTypes = {
    credits: PropTypes.number.isRequired,
    imageSetLink: PropTypes.func.isRequired,
    imageDetectFace: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(ImageLinkForm);