
const MessageAlert = ( { message, success } ) => {

	return (

		<div className="alert alert-dismissible mt-3" style={ { border: '1px solid #cecdcd' } }>
			<button type="button" className="close" data-dismiss="alert">&times;</button>
			<span className={ success ? 'text-success' : 'text-danger' }>{ message }</span>
		</div>

	);
};

export default MessageAlert;
