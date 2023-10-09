import classes from './Button.module.scss';

export const Button = ({ children, mode="primary", ...res }: any) => {
    return (
        <div className={`${classes.button} ${classes['mode-' + mode]}`} {...res}>
            {children}
        </div>
    );
}