import validator from 'validator';
import isEmpty from './isEmpty';


const validateAndSanitizeCheckoutForm = ( data ) => {

	let errors = {};
	let sanitizedData = {};

	/**
	 * Set the firstName value equal to an empty string if user has not entered the firstName, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly we do it for for the rest of the fields
	 */
	data.firstName = ( ! isEmpty( data.firstName ) ) ? data.firstName : '';
	data.lastName = ( ! isEmpty( data.lastName ) ) ? data.lastName : '';
	data.companyName = ( ! isEmpty( data.companyName ) ) ? data.companyName : '';
	data.country = ( ! isEmpty( data.country ) ) ? data.country : '';
	data.streetAddressOne = ( ! isEmpty( data.streetAddressOne ) ) ? data.streetAddressOne : '';
	data.streetAddressTwo = ( ! isEmpty( data.streetAddressTwo ) ) ? data.streetAddressTwo : '';
	data.city = ( ! isEmpty( data.city ) ) ? data.city : '';
	data.county = ( ! isEmpty( data.county ) ) ? data.county : '';
	data.postCode = ( ! isEmpty( data.postCode ) ) ? data.postCode : '';
	data.phone = ( ! isEmpty( data.phone ) ) ? data.phone : '';
	data.email = ( ! isEmpty( data.email ) ) ? data.email : '';
	data.createAccount = ( ! isEmpty( data.createAccount ) ) ? data.createAccount : '';
	data.orderNotes = ( ! isEmpty( data.orderNotes ) ) ? data.orderNotes : '';
	data.paymentMode = ( ! isEmpty( data.paymentMode ) ) ? data.paymentMode : '';

	/**
	 * Checks for error if required is true
	 * and adds Error and Sanitized data to the errors and sanitizedData object
	 *
	 * @param {String} fieldName Field name e.g. First name, last name
	 * @param {String} errorContent Error Content to be used in showing error e.g. First Name, Last Name
	 * @param {boolean} required Required if required is passed as false, it will not validate error and just do sanitization.
	 */
	const addErrorAndSanitizedData = ( fieldName, errorContent, required ) => {

		/**
		 * Please note that this isEmpty() belongs to validator and not our custom function defined above.
		 *
		 * Check for error and if there is no error then sanitize data.
		 */
		if ( required && validator.isEmpty( data[fieldName] ) ) {
			errors[fieldName] = `${errorContent} is required`;
		} else {
			sanitizedData[fieldName] = validator.escape( data[fieldName] );
		}
	};

	addErrorAndSanitizedData( 'firstName', 'First name', true );
	addErrorAndSanitizedData( 'lastName', 'Last name', true );
	addErrorAndSanitizedData( 'companyName', '', false );
	addErrorAndSanitizedData( 'country', 'Country name', true );
	addErrorAndSanitizedData( 'streetAddressOne', 'Street address line 1', true );
	addErrorAndSanitizedData( 'streetAddressTwo', '', false );
	addErrorAndSanitizedData( 'city', 'City field', true );
	addErrorAndSanitizedData( 'county', '', false );
	addErrorAndSanitizedData( 'postCode', 'Post code', true );
	addErrorAndSanitizedData( 'phone', 'Phone number', true );
	addErrorAndSanitizedData( 'email', 'Email', true );

	// data.createAccount is a boolean value.
	sanitizedData.createAccount = data.createAccount;
	addErrorAndSanitizedData( 'orderNotes', '', false );
	addErrorAndSanitizedData( 'paymentMode', 'Payment mode field', true );


	return {
		sanitizedData,
		errors,
		isValid: isEmpty( errors )
	}
};

export default validateAndSanitizeCheckoutForm;

