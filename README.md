# WP Decoupled :zap:
> * This is a React theme boilerplate for WordPress, built with Next JS, Webpack, Babel, Node, Express.

## Demo :movie_camera:
![](demo.gif)

## Getting Started :surfer:

These instructions will get you a copy of the project up and running on your local machine for development purposes.


### Installing :wrench:

1. Clone this repo in `git@github.com:rtCamp/wp-decoupled.git`
2. `cd wp-decoupled`
3. `npm install`

## Add GraphQl support on WordPress

1. Clone and activate the following plugins , in your WordPress plugin directory:
	* [wp-graphql](https://github.com/wp-graphql/wp-graphql) Exposes graphql for WordPress
	* [wp-graphql-woocommerce](https://github.com/wp-graphql/wp-graphql-woocommerce) Exposes graphql woocommerce for WordPress.
	* [wp-graphiql](https://github.com/wp-graphql/wp-graphiql) Provides GraphiQL IDE (playground) to the WP-Admin
	* [wp-graphql-jwt-authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication) extends the WPGraphQL plugin to provide authentication using JWT (JSON Web Tokens)
	
    * Then you can define a secret token in `wp-config.php` : 
    

```ruby
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-secret-token' );
```

In order to use this plugin, your WordPress environment must support the HTTP_AUTHORIZATION header. In some cases, this header is not passed to WordPress because of some server configurations.

Depending on your particular environment, you may have to research how to enable these headers, but in Apache, you can do the following in your .htaccess:

```SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1```
	
2. You can also import default wooCommerce products that come with wooCommerce Plugin for development ( if you don't have any products in your WordPress install )
   WP Dashboard > Tools > WooCommerce products(CSV) : The WooCommerce default products csv file is available at `wp-content/plugins/woocommerce/sample-data/sample_products.csv`   	

## Configure :wrench:

* Rename `client-config-example.js` to `client-config.js` and update your React Site URL

* Also add your Post Code Locale to validate post code on checkout form . Choose and add one from ( [ 'AD', 'AT', 'AU', 'BE', 'BG', 'CA', 'CH', 'CZ', 'DE', 'DK', 'DZ', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'ID', 'IL', 'IN', 'IS', 'IT', 'JP', 'KE', 'LI', 'LT', 'LU', 'LV', 'MX', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SA', 'SE', 'SI', 'TN', 'TW', 'UA', 'US', 'ZA', 'ZM' ] )

```ruby
const config = {
	siteUrl: 'http://localhost:3000',
	graphqlUrl: 'http://wordpressSiteUrl/graphql',
	postCodeLocale: 'IN'
};
```

* Rename `.env.example` to `.env` and update your WooCommerce config keys

```ruby
WOO_SITE_URL=http://yourwocommercesite.com
WOO_CONSUMER_KEY=xxxxx
WOO_SECRET=xxxxx
```

## Commands :computer:

* `dev` Runs the node server in development mode

## Branches Information: :seedling:

1. [master](https://github.com/rtCamp/wp-decoupled) Main React WooCommerce theme
2. [wp-docoupled-boilerplate](https://github.com/rtCamp/wp-decoupled/tree/wp-decoupled-boilerplate) Boilerplate to start a new React theme project with PWA implementation ( Work in Progress )

## Versioning :bookmark_tabs:

I use [Git](https://github.com/) for versioning. 

## Author

* [rtCamp](https://rtcamp.com)

## Contributor :bust_in_silhouette:

* **[Imran Sayed](https://github.com/imranhsayed)**
* **[Muhammad Muhsin](https://github.com/m-muhsin)**
* **[Divyaraj Masani](https://github.com/divyarajmasani)**
* **[Sayed Taqui](https://github.com/sayedtaqui)**

## License :page_with_curl:

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
