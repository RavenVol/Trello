import React from 'react';

import Arcanoid from './Arcanoid';

import '../styles/css/reset.css';
import '../styles/css/main.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      windowResolution: [],
    }
  }

  componentDidMount = () => {
    this.getStateFromWindowRes();
    window.addEventListener("resize", () => this.getStateFromWindowRes());
  }

  getStateFromWindowRes = () => {
    const newWindowResolution = [window.innerWidth, window.innerHeight];
    this.setState({
      windowResolution: newWindowResolution,
    });
  }

  render() {
    const {windowResolution} = this.state;

    return (
      <div className="arcanoid">
        <Arcanoid windowResolution={windowResolution} />
      </div>
    );
  }
}

export default App;
