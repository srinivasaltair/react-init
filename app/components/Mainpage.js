import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';
import $ from 'jquery';

class MainPage extends React.Component{

    render() {
        return (
            <div className="container-fluid">
                <Navigation />
                <div className="container">
                    <h1>Modern Javascript Library - React JS</h1>
                    <h4>Includes Bootstrap Styles, Webpack Bundler, Babel Transpiler</h4>
                    <hr/>
                    <h4>Write code in HTML5, SCSS, Javascript(ES6 Support), JSX</h4>
                    <a href="#" target="_blank" className="btn btn-primary btn-lg">Github Repo</a>
                </div>
            </div>
        )
    }
}

export default MainPage