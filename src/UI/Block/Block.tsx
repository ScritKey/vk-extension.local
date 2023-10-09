import React from 'react';
import classes from "./Block.module.scss";

export interface BlockProps extends React.ImgHTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    id?: string;
}

export const Block = ({
    children,
    header,
    footer,
    id = "",
    ...restProps
}:BlockProps) => {
    return (
        <div className={classes.block} {...restProps}>
            {header? (
                <div className={classes.headerBlock}>
                    {header}
                </div>
            ) : null}
            <div id={id} className={classes.children}>
                {children}
            </div>
            {footer? (
                <div className={classes.footerBlock}>
                    {footer}
                </div>
            ) : null}
        </div>
    );
}