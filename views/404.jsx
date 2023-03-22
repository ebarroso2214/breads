const React = require('react')
const Default = require('./layouts/default')

function page404 (html){
    return (
        <Default>
            <h1>OOPS! This page doesn't exist</h1>
            <li><a href="/breads">Go home</a></li>
        </Default>
    )
}

module.exports = page404