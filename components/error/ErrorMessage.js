
const ErrorMessage = ( { error } ) => (
	<div className="alert alert-dismissible alert-light">
		<button type="button" className="close" data-dismiss="alert">&times;</button>
		<span>{ error }</span>
	</div>
);

export default ErrorMessage;
