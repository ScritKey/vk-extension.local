import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { sysUpdate } from '../../store/sys/sysSlice';
import './Header.scss';

import { ButtonMenu } from '../../UI';

const Header = () => {
    const route = useAppSelector(state => state.sys.route);

    const dispatch = useAppDispatch();
    
    return (
        <div className="header-root">
            <ButtonMenu active={route === 'main'} onClick={() => dispatch(sysUpdate({ route: "main" }))}>
                Основное
            </ButtonMenu>
            <ButtonMenu active={route === 'lifecycle'} onClick={() => dispatch(sysUpdate({ route: "lifecycle" }))}>
                Системные
            </ButtonMenu>
            {/*<ButtonMenu active={route === 'launch-params'} onClick={() => dispatch(sysUpdate({ route: "launch-params" }))}>*/}
            {/*    Параметры запуска*/}
            {/*</ButtonMenu>*/}
            <ButtonMenu active={route === 'device'} onClick={() => dispatch(sysUpdate({ route: "device" }))}>
                Девайс
            </ButtonMenu>
            <ButtonMenu active={route === 'sensors'} onClick={() => dispatch(sysUpdate({ route: "sensors" }))}>
                Датчики+
            </ButtonMenu>
        </div>
    );
}

export default Header;