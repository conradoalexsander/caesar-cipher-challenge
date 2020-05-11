import React from "react";
import aceleraDev from "../api/aceleraDevAPI";
import { saveAs } from "file-saver";

class AnswerRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: "", numCasas: "", message: "" };
  }

  handleChange = event => {
    this.setState({ token: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = this.getToken.value;
    this.onSearchSubmit(token);
  };

  onSearchSubmit = async token => {
    const response = await aceleraDev.get(`generate-data?token=${token}`);
    console.log(response);
    this.setState({
      numCasas: response.data.numero_casas,
      message: response.data.cifrado
    });

    var blob = new Blob([JSON.stringify(response.data)], {
      type: "application/json;charset=utf-8"
    });
    saveAs(blob, "answer.json");
  };

  render() {
    return (
      <div>
        <div className="ui dividing header">Informe seu token</div>
        <form onSubmit={this.handleSubmit} className="ui form">
          <div className="field">
            <input
              type="text"
              value={this.state.textValue}
              onChange={this.handleChange}
              placeholder="Insira o token do seu aceleraDevChallenge aqui"
              ref={input => (this.getToken = input)}
            />
          </div>

          <button className="ui button" type="submit">
            Enviar
          </button>
        </form>
        <br />
      </div>
    );
  }
}

export default AnswerRequestForm;
