import React, { Component } from 'react';
// import { Button } from 'antd';
import './App.less';
// import Admin from './admin';


class App extends Component {
  render() {
    return (
      <div>
        {/* <Admin/> */}
        {this.props.children}
      </div>
    );
  }
}

export default App;