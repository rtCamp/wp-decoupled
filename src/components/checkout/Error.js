const Error = ({ errors, fieldName }) => {
    return errors && Object.prototype.hasOwnProperty.call(errors, fieldName) ? (
        <div className="invalid-feedback d-block">{errors[fieldName]}</div>
    ) : (
        ''
    );
};

export default Error;
