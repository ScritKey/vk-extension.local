import React from 'react';

import classes from './Modal.module.scss';

export const Modal = ({ children }: any) => {
    return (
        <>
            <div className={classes.modalContent}>
                {children}
            </div>

            {/* <div className='vkuiModalCard vkuiModalCard--android'>
                <div className='vkuiModalCardBase vkuiModalCardBase--android vkuiModalCard__in' style={{transform: "translate3d(0px, 0%, 0px)"}}>
                    <div className='vkuiModalCardBase__container'>
                        {children}
                    </div>
                </div>
            </div> */}
        </>
    );
};