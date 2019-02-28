import React, { Component } from 'react';

import './index.less'

export default class Footer extends Component{
    state={
        currentYear:null
    }
    componentWillMount() {
        this.getYear();
    }
    getYear=()=>{
        let year = new Date().getFullYear().toString();
        this.setState({
            currentYear: year
        })
    }
    render(){
        let {currentYear} = this.state;
        return (
            <div className="footer">
                provide with ❤ by @{currentYear} btbrad | powered by <a href="https://reactjs.org">React.js</a>
            </div>
        )
    }
}