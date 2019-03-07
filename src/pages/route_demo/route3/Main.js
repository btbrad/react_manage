import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Main extends Component{
    render(){
        return(
            <div>
                <ul>
                    <li>
                        <Link to='/home/a'>a</Link>
                    </li>
                    <li>
                        <Link to='/home/b'>b</Link>
                    </li>
                </ul>
                <hr/>
                {this.props.childrenx}
            </div>
        )
    }
}