import './style.css';
import Overlay from 'components/Overlay'

function Modal({ children, closeModal }) {
    const handleClick = (e, canClose) => {
        e.stopPropagation();
        if (canClose) closeModal();
    }


    return (
        <Overlay overlayClick={closeModal}>
            <div className="Modal" onClick={handleClick}>
                <span className="ModalClose"  onClick={(e) => handleClick(e,true)}><i className="bi bi-x-lg"></i></span>
                <div className="ModalBody">{children}</div>
            </div>
        </Overlay >
    )
}

export default Modal;