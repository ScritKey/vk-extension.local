import classes from  './Device.module.scss';
import { Icon16LogoApple, Icon16StoryOutline, Icon16WarningTriangleOutline } from "@vkontakte/icons";
import { IDevice } from "../../../store/sys/sysSlice";
import React from "react";

export const DeviceAndroid = ({deviceProps, styleRoot = {}}: {deviceProps: IDevice, styleRoot?: React.CSSProperties}) => {
    let style = {
        color: deviceProps.statusBarStyle === "dark"? "#000" : "#fff",
        background: deviceProps.actionBarColor,
        ...styleRoot
    }



    return (
        <>
            <div className={classes.infoBarAndroid}>
                <div className={classes.fixedContent} style={style}>
                    <div className={classes.left}>
                        15:32

                        <div className={classes.iconWrap}>
                            <Icon16WarningTriangleOutline/>
                        </div>
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
        </>
    );
}