import React from "react";

class CriptedMsg extends React.Component {
  render() {
    return (
      <div>
        <div className="ui dividing header">Mensagem cifrada</div>
        <div className="ui segment">
          <div>
            <strong>Token:</strong> {this.props.token}
          </div>
          <div>
            <strong>Cifrado:</strong> {this.props.message}
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default CriptedMsg;
