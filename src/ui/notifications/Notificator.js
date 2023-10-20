import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notificator = () => {
    const state = useSelector(state => state.noticeState);
    let status = state.status;

    useEffect(() => {
        const timer = setTimeout(() => {
            return status = '';
        }, 1000);
        if (state.noticeStatus === 'complete' || state.noticeStatus === 'error') {
            timer();
        }

        return () => clearTimeout(timer);
    }, [status]);

    return <div className={"notificator " + status}>

        <div className="notificatorBlock">
            <h4 className="notificatorHeader"> {state.title} </h4>
            <span className="notificationDelimeter "> | </span>
            <p className={"notificatorText"}> {state.message} </p>
        </div>

    </div>


}

export default Notificator;