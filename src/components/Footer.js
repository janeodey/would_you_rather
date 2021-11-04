import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div style={myStyle}>
        <div style={{ fontSize: "1em" }}>
          {new Date().getFullYear()},This Would You Rather app was created using React,
          Redux, React Router, and React Semantic UI for my React Nano Degree Program.
        </div>
      </div>
    );
  }
}
const myStyle={ 
  marginTop: "5em", 
  padding: "3em 0", 
  backgroundColor:"green", 
  textAlign:"center",color:"#fff" 
}
export default Footer;
