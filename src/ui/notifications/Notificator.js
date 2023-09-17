const Notificator = ({ status }) => {
    let bgstate = 'loading' ? '' : 'bg_active';
    const statusState = status.title === 'Complete' ? 'complete' : 'error';

    return <div className={"notificator " + statusState}>

        <div className="notificatorBlock">
            <h4 className="notificatorHeader"> {status.title} </h4>
            <span className="notificationDelimeter "> | </span>
            <p className={"notificatorText " + bgstate}> {status.message} </p>
        </div>

    </div>


}

export default Notificator;