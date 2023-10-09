import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import classes from './ModalPortal.module.scss';


export interface IModalPortalProps {
    children?: React.ReactNode;
    loading?: boolean
}

export const ModalPortal = ({ children, loading }: IModalPortalProps) => {
    const el = useRef(document.createElement('div'));

    useEffect(() => {
        const element = el.current;
        document.body.appendChild(element);

        return () => {
            document.body.removeChild(element);
        }
    }, []);

    return (
        ReactDOM.createPortal(
            <div className={classes.modalPortalWrap}>
                <div className={classes.modalPortalMask} />
                {loading ? (
                    <div className={classes.modalPortalLoading}>
                        Загрузка...
                    </div>
                ) : (
                    <div className="vkui--vkBase--dark">
                        {children}
                    </div>
                )}
            </div>,
            el.current
        )
    );
}