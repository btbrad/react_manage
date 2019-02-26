import React, { Component } from 'react'

export default class Child extends Component {
    constructor(props){
        super(props);
        console.log("constructor");
    }

    componentWillMount() {
        console.log("will mount");
    }

    componentDidMount() {
        console.log("did mount");
    }

    componentWillReceiveProps(nextProps) {
        console.log("will recive props "+nextProps.count);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
         console.log("should update "+nextProps.count+" "+nextState);
         return true; 
    }
    
    componentWillUpdate(nextProps, nextState) {
        console.log("will update");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("did update");
    }
    
    componentWillUnmount() {
        console.log("will unmount");
    }

    render(){
        console.log("render");
        let {count} = this.props;
        return(
            <div>
                <p>这是子组件</p>
                <p>{count}</p>
            </div>
        )
    }
}