import css from '../Styles.module.css';
import { Modal } from 'components/Modal/Modal';
// import React from 'react';
import {useState} from 'react'
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({webformatURL, tags, bigURL}) => {
    const [showModal, setShowModal] = useState(false);

    const togglenModal = () => {
        setShowModal(!showModal);
    };

    return <>
            <li className={css.ImageGalleryItem}>
        <img className={css.ImageGalleryItem_image} src={webformatURL} alt={tags} onClick={togglenModal} />
    </li>
    { showModal && <Modal onClose={togglenModal}> <img src={bigURL} alt={tags} /> </Modal >}
        </>
}

// export class ImageGalleryItem extends React.Component {
//     state = {
//         showModal: false,
//     };

    // togglenModal = () => {
    //     this.setState(prevState => ({
    //     showModal: !prevState.showModal,
    //     }));
    // };

// render() {
    
//     const { webformatURL, tags, bigURL } = this.props

//     return <>
//             <li className={css.ImageGalleryItem}>
//         <img className={css.ImageGalleryItem_image} src={webformatURL} alt={tags} onClick={ this.togglenModal} />
//     </li>
//     { this.state.showModal && <Modal onClose={ this.togglenModal}> <img src={bigURL} alt={tags} /> </Modal >}
//         </>
//     }
    
// }

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    bigURL: PropTypes.string.isRequired
}

