const Notificator = ({ status }) => {
    const statusState = status.title === "Sending request" ? '' : status.title === 'Complete' ? 
    'complete' :  'error';

    return <div className={"notificator " + statusState}>

        <div className="notificatorBlock">
            <h4 className="notificatorHeader"> {status.title} </h4>
            <span className="notificationDelimeter "> | </span>
            <p className={"notificatorText"}> {status.message} </p>
        </div>

    </div>


}

export default Notificator;