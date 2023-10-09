import React from 'react';
import classes from "./ButtonMenu.module.scss";

export interface ButtonMenuProps extends React.ImgHTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    active?: boolean;
}

export const ButtonMenu = ({
    children,
    active,
    ...restProps
}:ButtonMenuProps) => {
    return (
        <div className={active? `${classes.buttonMenu} ${classes.active}` : `${classes.buttonMenu}`} {...restProps}>
            {children}
        </div>
    );
}