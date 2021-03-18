import axios from "axios";
import React, { Component } from "react";
import Input from "../component/Input";
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      chats: [],
    };
  }
  componentDidMount = async () => {
    setTimeout(() => {
      this.getChat();
    }, 2000);
  };

  onChange = (input) => {
    this.setState({ input });
    console.log(input.length);
  };
  getChat = async () => {
    let response = null;
    try {
      response = await axios.get(
        "https://6052bfbffb49dc00175b88a9.mockapi.io/chat/chats"
      );
    } catch (error) {
      alert(error.message);
    }
    if (response) {
      this.setState({ chats: response.data });
    }
  };
  sendChat = async () => {
    let response = null;
    const data = {
      content: this.state.input,
    };
    try {
      response = await axios.post(
        "https://6052bfbffb49dc00175b88a9.mockapi.io/chat/chats",
        data
      );
      this.setState({ input: "" });
    } catch (error) {
      alert(error.message);
    }
    this.getChat();
  };

  render() {
    const resChat = this.state.chats;
    return (
      <div className='page'>
        <div className='box-wraper'>
          <div className='header'>
            <div className='icon-x'>x</div>
            <button className='button-tw'>Tweet</button>
          </div>
          <div className='content-chat-wraper'>
            {resChat.map((res, index) => {
              const lastIndex = res.content.length - 1;
              return (
                <div key={index} className='content-chat'>
                  <div className='avatar'></div>
                  <div className='content'>
                    <span>{res.content.substring(0, 49)}</span>
                    {lastIndex > 49 && (
                      <span style={{ background: "blue" }}>
                        {res.content.substring(50, lastIndex)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className='input-action'>
            <div className='field'>
              <Input
                type='text'
                min='40'
                max='50'
                value={this.state.input}
                onChange={this.onChange}
              />
            </div>
            <button
              onClick={() => {
                this.sendChat();
              }}
              className='reply'
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
