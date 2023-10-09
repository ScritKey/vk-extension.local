import classes from  './Device.module.scss';
import { Icon16LogoApple, Icon16StoryOutline, Icon16WarningTriangleOutline } from "@vkontakte/icons";
import { IDevice } from "../../../store/sys/sysSlice";
import React from "react";

export const DeviceIPhone = ({deviceProps, styleRoot}: {deviceProps: IDevice, styleRoot?: React.CSSProperties}) => {
    return (
        <>
            <div className={classes.infoBarIOS} style={styleRoot}>
                <div className={classes.timeBar}>
                    <div className={classes.left}>
                        15:32
                    </div>
                    <div className={classes.middle}>
                        <div className={classes.line}/>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.iconWrap}>
                            <Icon16LogoApple/>
                        </div>
                        <div className={classes.iconWrap}>
                            <Icon16StoryOutline/>
                        </div>
                        <div className={classes.iconWrap}>
                            <Icon16WarningTriangleOutline/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.infoBarBottomIOS} style={styleRoot}>
                <div className={classes.line}/>
            </div>
        </>
    );
}