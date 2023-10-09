import classes from './ModalCard.module.scss';
import { Icon24Cancel } from "@vkontakte/icons";

export interface buttonsWrapProps {
    children?: React.ReactNode;
    buttonsWrap?: React.ReactNode;
    logo?: boolean;
    subTitle?: React.ReactNode;
    onClose?: (a: any) => void;
}

export const ModalCard = ({ children, buttonsWrap, logo, subTitle, onClose }: buttonsWrapProps) => {
    return (
        <>
            <div className={classes.modalCard}>
                {onClose? (
                    <div className={classes.buttonClose}>
                        <Icon24Cancel/>
                    </div>
                ) : null}

                {logo ? (
                    <div className={classes.logo}/>
                ) : null}

                <div className={classes.children}>
                    {children}

                    {subTitle ? (
                        <div className={classes.subTitle}>
                            {subTitle}
                        </div>
                    ) : null}
                </div>

                <div className={classes.buttonsWrap}>
                    {buttonsWrap ? buttonsWrap : null}
                </div>
            </div>
        </>
    );
};