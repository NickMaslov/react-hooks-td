import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null,
    status: navigator.onLine,
    location: {},
    mounted: true
  };

  componentDidMount() {
    document.title = `You have clicked ${this.state.count} times`;//counter
    window.addEventListener('mousemove', this.handleMouseMove);//mouse position
    window.addEventListener('online', this.handleOnline);//status
    window.addEventListener('offline', this.handleOffline);
    navigator.geolocation.getCurrentPosition(this.handleGeolocation);//geolocation
    this.watchId = navigator.geolocation.watchPosition(this.handleGeolocation)
  }
  componentDidUpdate() {
    document.title = `You have clicked ${this.state.count} times`;
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    navigator.geolocation.clearWatch(this.watchId)
    this.setState({mounted: false})
  }

  handleGeolocation = event =>{
    console.log(event.coords)
    this.setState({location:event.coords})}
  
  handleOnline = () => this.setState({ status: true });
  handleOffline = () => this.setState({ status: false });

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY,
    });
  };

  incrementCount = () => {
    this.setState(
      //prevState => ({ count: prevState.count + 1 })
      {
      count: this.state.count + 1,
    });
  };

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn,
    }));
  };

  render() {
    let { count, isOn, x, y, status, location } = this.state;
    console.log(this.state)
    return (
      <>
        <h2>Counter</h2>
        <button onClick={this.incrementCount}>
          I was clicked {count} times{' '}
        </button>
        <h2>Toggle Light</h2>
        <div
          style={{
            height: '50px',
            width: '50px',
            background: isOn ? 'yellow' : 'gray',
          }}
          onClick={this.toggleLight}
        />
        <h2>Mouse Position</h2>
        <p>X position: {x}</p>
        <p>Y position: {y}</p>
        <br />
        <h2>Network Status</h2>
        <p>
          You are <strong>{status ? 'online' : 'offline'}</strong>
        </p>
        <h2>Geolocation</h2>
        <p>Latitude is {location.latitude}</p>
      <p>Longitude is {location.longitude}</p>
      <p>Your speed is {location.speed?location.speed:'0'}</p>
      </>
    );
  }
}

export default App;
