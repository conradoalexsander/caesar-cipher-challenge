import React from "react";
import CriptedMsg from "./criptedMsg";
import DecriptedMsg from "./decriptedMsg";
import AnswerRequestForm from "./AnswerRequestForm";

try {
  var answer = require("../util/answer.json");
} catch (err) {
  // send error to log file
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { criptedMsg: " ", numHouses: 0, token: " " };
  }

  componentDidMount() {
    if (answer) {
      this.setState({
        criptedMsg: answer.cifrado,
        numHouses: answer.numero_casas,
        token: answer.token
      });
    }
  }
  render() {
    return (
      <div className="ui container">
        <h1>AceleraDev Decripter</h1>
        <div className="ui segment">
          <AnswerRequestForm />
          <CriptedMsg
            token={this.state.token}
            message={this.state.criptedMsg}
          />
          <DecriptedMsg
            token={this.state.token}
            message={this.state.criptedMsg}
            numHouses={this.state.numHouses}
          />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
