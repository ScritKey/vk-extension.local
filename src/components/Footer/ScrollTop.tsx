import { useAppSelector } from "../../store/hook";

const nameEvent = "VKWebAppScrollTopStart";

export const ScrollTop = () => {
    const sensors = useAppSelector(state => state.sys.sensors);

    return (
        <div className={sensors[nameEvent]? "item active" : "item"}>
            ScrollTop
            <div className={sensors[nameEvent]? "circle active" : "circle"}/>
        </div>
    );
}