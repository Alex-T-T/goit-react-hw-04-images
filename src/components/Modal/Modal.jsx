import css from '../Styles.module.css';
import React from 'react';
// import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root')


// export const Modal = (onClose) => {

    // useEffect(() => {
    //   window.addEventListener('keydown', handleKeyDown)
    
    //   return () => {
    //     window.removeEventListener('keydown', handleKeyDown)
    //   }
    // }, [handleKeyDown])
    

    // // useEffect(() => {
    // //     window.addEventListener('keydown', handleKeyDown)
    // // }, [handleKeyDown]);

    // // useEffect(() => {
    // //     window.removeEventListener('keydown', handleKeyDown)
    // // }, [handleKeyDown])

//     const handleKeyDown = (event) => {
//         if (event.code === 'Escape') {
//                 onClose();
//             }
//     }

//     const handleBackdropClick = (event) => {
//         if (event.currentTarget === event.target) {
//             console.log("Click on backdrop");
//             onClose();
//         }
//     }


//     return createPortal(<div className={css.Overlay} onClick={handleBackdropClick}>
//         <div className={css.Modal}>
//             {this.props.children}
//         </div>
//     </div>, modalRoot)

// }



export class Modal extends React.Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (event) => {
        if (event.code === 'Escape') {
                this.props.onClose();
            }
    }

    handleBackdropClick = (event) => {
        if (event.currentTarget === event.target) {
            console.log("Click on backdrop");
            this.props.onClose();
        }
    }

    render() {
    return createPortal(<div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
            {this.props.children}
        </div>
    </div>, modalRoot)
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}




