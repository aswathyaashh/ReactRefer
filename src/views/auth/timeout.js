// import React, {Component} from "react"
// import IdleTimer from "react-idle-timer"
// import { useHistory } from "react-router"
// class AuthLayout extends Component {
//  constructor(props){
//   super(props)
//   this.state={
//     isTimedOut: false
//   }
//   this.idleTimer = React.createRef()
//  }
// }
// const history= useHistory();
// _onAction = (e) => {
//   this.setState({ 'isTimedOut': false })
// }
// _onIdle = (e) => {
//   const { isTimedOut } = this.state;
//   if (isTimedOut){
//     localStorage.clear();
//     history.push("/Login");
//   }
//   else {
//     this.idleTimer.current.reset();
//     this.setState({ isTimedOut: true })
//   }
// }
// render() {
//   return (
//     <React.Fragment>
//       <p>{ this.state.idleTimeout ? 'ACTIVE : "Time to logout' }</p>
//       <IdleTimer>
//         key='idleTimer'
//         startOnMount={ true }
//         ref={ this.idleTimer }
//         element={ document }
//         onActive={ this._onActive }
//         onIdle={ this._onIdle }
//         timeout={  }
//       </IdleTimer>
//    </React.Fragment>
//   );
//  }
// }
// export default AuthLayout;