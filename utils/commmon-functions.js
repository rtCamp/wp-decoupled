/**
 * Converts the html entities to html.
 *
 * @param {string} html HTML with entities.
 * 
 * @return {string} html with converted html entities.
 */
export const wpdDecodeHtml = ( html ) => {

	const txt = document.createElement('textarea' );
	txt.innerHTML = html;
	return txt.value;

};
