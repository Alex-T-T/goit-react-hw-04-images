import css from '../Styles.module.css';
import PropTypes from 'prop-types';


export const ImageErrorView = ( wrongValue ) => {
    // console.log("wrongValue =>", typeof wrongValue)
    // console.log("wrongValue =>",  wrongValue)
    // console.log("wrongValue keys =>", Object.keys(wrongValue))
    // console.log("wrongValue values =>", Object.values(wrongValue))

    return <h1 className={css.wrong}>{ Object.values(wrongValue)}</h1>
}

ImageErrorView.propTypes = {
    wrongValue: PropTypes.string.isRequired,
}