/**
 * Converts the html entities to html.
 *
 * @param {string} html html with entities.
 * @return {string} html with converted html entities.
 */
export const wpdDecodeHtml = ( html ) => {

	const txt = document.createElement('textarea' );
	txt.innerHTML = html;
	return txt.value;

};

/**
 * Get the value of a querystring
 *
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 *
 * @return {String}       The field value
 */
export const wpdGetQueryString =  ( field, url = '' ) => {
	const href = url ? url : window.location.href;
	const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	const string = reg.exec(href);
	return string ? string[1] : null;
};
