import React from 'react';
import  ReactDom  from 'react-dom';

function Modal({children, onClose}) {
  return ReactDom.createPortal(
    <>
        {children}
    </>
    ,document.getElementById('cart-root')
  )
}

export default Modal