import DOMPurify from 'dompurify';
import { wpdDecodeHtml } from '../../utils/commmon-functions';

const MessageAlert = ({ message, success, onCloseButtonClick }) => {
  return (
    <div
      className="alert alert-dismissible mt-3"
      style={{ border: '1px solid #cecdcd' }}
    >
      <button
        type="button"
        onClick={onCloseButtonClick}
        className="close text-muted"
        data-dismiss="alert"
      >
        <small>&times;</small>
      </button>
      <span
        className={success ? 'text-success' : 'text-danger'}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(wpdDecodeHtml(message)),
        }}
      />
    </div>
  );
};

export default MessageAlert;
