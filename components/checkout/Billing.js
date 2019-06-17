import countryList from './country-list';

const Billing = () => {
	return (
		<form className="wd-checkout-form">
			{/*Name*/}
			<div className="row">
				<div className="col-lg-6 col-md-12">
					<div className="form-group">
						<label htmlFor="first-name">
							First Name
							<abbr className="required" title="required">*</abbr>
						</label>
						<input type="text" name="firstName" className="form-control wd-checkout-input" id="first-name"/>
					</div>
				</div>
				<div className="col-lg-6 col-sm-12">
					<div className="form-group">
						<label htmlFor="last-name">
							Last Name
							<abbr className="required" title="required">*</abbr>
						</label>
						<input type="text" name="lastName" className="form-control wd-checkout-input" id="last-name"/>
					</div>
				</div>
			</div>
			{/* Company Name */}
			<div className="form-group">
				<label htmlFor="first-name">Company Name</label>
				<input type="text" name="companyName" className="form-control wd-checkout-input" id="first-name"/>
			</div>
			{/* Country */}
			<div className="form-group">
				<label htmlFor="country-select">
					Country
					<abbr className="required" title="required">*</abbr>
				</label>
				<select name="country" className="form-control wd-checkout-input" id="country-select">
					{ countryList.length && (
						countryList.map( country => (
							<option value={ country }>{ country }</option>
						) )
					) }
				</select>
			</div>
			{/* Street Address */}
			<div className="form-group">
				<label htmlFor="street-address">
					Street Address
					<abbr className="required" title="required">*</abbr>
				</label>
				<input type="text" name="streetAddressOne" placeholder="House number and street name" className="form-control wd-checkout-input" id="street-address"/>
				<br/>
				<input type="text" name="streetAddressTwo" placeholder="Apartment, suite, unit etc.(optional)" className="form-control wd-checkout-input" id="first-name"/>
			</div>
			{/* Town/City */}
			<div className="form-group">
				<label htmlFor="city">
					Town/City
					<abbr className="required" title="required">*</abbr>
				</label>
				<input type="text" name="city" className="form-control wd-checkout-input" id="city"/>
			</div>
			{/* County */}
			<div className="form-group">
				<label htmlFor="county">County</label>
				<input type="text" name="county" className="form-control wd-checkout-input" id="county"/>
			</div>
			{/* Post Code */}
			<div className="form-group">
				<label htmlFor="post-code">
					Town/City
					<abbr className="required" title="required">*</abbr>
				</label>
				<input type="text" name="postCode" className="form-control wd-checkout-input" id="post-code"/>
			</div>
			{/*Phone & Email*/}
			<div className="row">
				<div className="col-lg-6 col-md-12">
					<div className="form-group">
						<label htmlFor="phone">
							Phone
							<abbr className="required" title="required">*</abbr>
						</label>
						<input type="text" name="phone" className="form-control wd-checkout-input" id="phone"/>
					</div>
				</div>
				<div className="col-lg-6 col-sm-12">
					<div className="form-group">
						<label htmlFor="email">
							Email
							<abbr className="required" title="required">*</abbr>
						</label>
						<input type="email" name="email" className="form-control wd-checkout-input" id="email"/>
					</div>
				</div>
			</div>
			{/*	Create an Account */}
			<div className="form-check">
				<label className="form-check-label">
					<input className="form-check-input" name="createAccount" type="checkbox" value="true" checked=""/>
						Create an account?
				</label>
			</div>
			<h2 className="mt-4 mb-4">Additional Information</h2>
			{/* Order Notes */}
			<div className="form-group">
				<label htmlFor="order-notes">Order Notes</label>
				<textarea name="orderNotes" className="form-control wd-checkout-textarea" id="order-notes" rows="4">{''}</textarea>
			</div>
		</form>
	);
};

export default Billing;
