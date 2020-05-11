import React from "react";
import aceleraDev from "../api/aceleraDevAPI";
import { saveAs } from "file-saver";

var sha1 = require("sha1");

class DecriptedMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decriptedMessage: "",
      cryptSummary: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.message !== prevProps.message) {
      this.decrypt(this.props.message, Number(this.props.numHouses));
    }
  }

  render() {
    return (
      <div>
        <div className="ui dividing header">Mensagem decifrada</div>

        <div className="ui segment">
          <div>
            <strong>Mensagem: </strong>
            {this.state.decriptedMessage}
          </div>
          <div>
            <strong>Resumo criptográfico (sha1): </strong>

            {this.state.cryptSummary}
          </div>
        </div>
        <br />
        <div className="ui one column stackable center aligned page grid">
          {" "}
          <form
            onSubmit={this.handleSaveFile}
            className="ui form center aligned"
          >
            {" "}
            <button className="ui yellow button" type="submit">
              Salvar Arquivo{" "}
            </button>
          </form>
          <form onSubmit={this.handleSubmit} className="ui form center aligned">
            <button className="ui green button" type="submit">
              Enviar Arquivo decifrado
            </button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.onFormSubmit(this.props.token);
  };

  handleSaveFile = e => {
    e.preventDefault();
    this.onSaveFormSubmit();
  };

  onSaveFormSubmit = async () => {
    //const response = await aceleraDev.post(`submit-solution?token=${token}`);

    var blob = new Blob(
      [
        JSON.stringify({
          numero_casas: this.props.numHouses,
          token: this.props.token,
          cifrado: this.props.message,
          decifrado: this.state.decriptedMessage,
          resumo_criptografico: this.state.cryptSummary
        })
      ],
      {
        type: "application/json;charset=utf-8"
      }
    );
    saveAs(blob, "answer.json");
  };

  onFormSubmit = token => {
    const data = new FormData();

    var blob = new Blob(
      [
        JSON.stringify({
          numero_casas: this.props.numHouses,
          token: this.props.token,
          cifrado: this.props.message,
          decifrado: this.state.decriptedMessage,
          resumo_criptografico: this.state.cryptSummary
        })
      ],
      {
        type: "application/json;charset=utf-8"
      }
    );

    data.append("action", "ADD");
    data.append("param", 0);
    data.append("secondParam", 0);
    data.append("answer", blob);

    aceleraDev
      .post(`submit-solution?token=${token}`, data)
      .then(response => console.log(response))
      .catch(errors => console.log(errors));
  };

  decrypt = (message, rotation) => {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var caesarAlphabet = alphabet;
    caesarAlphabet = caesarAlphabet.split("");

    for (var i = 0; i < rotation + 2; i++) {
      caesarAlphabet.push(alphabet[i]);
    }

    for (var j = 0; j < rotation + 2; j++) {
      caesarAlphabet.shift();
    }

    message = message.toLowerCase().split("");

    message.forEach(caesarDecrypter);

    message = message.join("");

    function caesarDecrypter(item, index, arr) {
      if (alphabet.indexOf(item) !== -1) {
        arr[index] = caesarAlphabet[alphabet.indexOf(item)];
      }
    }

    var sha1Message = sha1(message);
    console.log(sha1Message);
    this.setState({ decriptedMessage: message, cryptSummary: sha1Message });
  };
}

export default DecriptedMsg;
