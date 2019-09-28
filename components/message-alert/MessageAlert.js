
import DOMPurify from 'dompurify';

const MessageAlert = ( { message, success } ) => {

	function wpdDecodeHtml(html) {
		const txt = document.createElement('textarea' );
		txt.innerHTML = html;
		return txt.value;
	}

	return (

		<div className="alert alert-dismissible mt-3" style={ { border: '1px solid #cecdcd' } }>
			<button type="button" className="close" data-dismiss="alert">&times;</button>
			<span className={ success ? 'text-success' : 'text-danger' } dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize( decodeHtml( message ) ) } } />
		</div>

	);
};

export default MessageAlert;
