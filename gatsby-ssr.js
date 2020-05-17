/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it


require('firebase/firestore');
require('firebase/auth');
require('firebase/functions');

const React = require('react')
const Layout = require('./src/components/layout').default

exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>
}