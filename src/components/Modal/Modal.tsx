import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';
import {Icon20Cancel} from "@vkontakte/icons";

export interface ModalProps {
    children?: React.ReactNode,
    onClose?: () => void,
    title?: React.ReactNode,
}

export const Modal = ({onClose, children, title, ...otherProps}: ModalProps) => {
    const el = useRef(document.createElement('div'));
    const onCloseRef = useRef(onClose);


    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const element = el.current;

        document.body.appendChild(element);
    }, []);

    function closeModal() {
        const element = el.current;

        if(element) {
            document.body.removeChild(element);
        }

        if(onCloseRef.current) {
            onCloseRef.current();
        }
    }

    function closeModalMask() {
        closeModal();
    }

    return(
        ReactDOM.createPortal(
            <div className='modalWrap'>
                <div className="modalMask" onClick={closeModalMask}/>
                <div className="wrapModalContent" {...otherProps}>
                    <div className='modalContent'>
                        <div className="headerModal">
                            <div className="title">
                                {title}
                            </div>
                            <div className="close" onClick={closeModal}>
                                <div className="iconWrap">
                                    <Icon20Cancel/>
                                </div>
                            </div>
                        </div>

                        <div className="scrollContent">
                            {children}
                        </div>
                    </div>
                </div>
            </div>,
            el.current
        )
    );
};