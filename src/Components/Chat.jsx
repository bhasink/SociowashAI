import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bars } from 'react-loader-spinner'
import ReactHtmlParser from 'react-html-parser';

const Chat = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [storedValues, setStoredValues] = useState([]);
  const [loader, setLoader] = useState(false);
  
  const instance = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
  });


  

  const askGPT = async (prompt) => {
    const response = await instance.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt },
      { role: "user", content: "You are an digital marketing bot for agency Sociowash. Please don't answer queries outside marketing" }],
    });
    console.log("response.data.choices[0].message.content;", response.data.choices[0].message.content)
    
    return response.data.choices[0].message.content;
  };

  const handleSubmit = async () => {
    setLoader(true)
    const response = await askGPT(newQuestion);
    setStoredValues([
      
      ...storedValues, {
        question: newQuestion,
        answer: response,
      }
    ]);
    setLoader(false)
    setNewQuestion("");
  };

  const enterHandle = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>

      <div
        className="page-content page-container bg-color-lite "
        id="page-content"
      >
        <div className="padding polaroid">
          <div className="" style={{margin: '2em'}} >
            <div className="">
              <div className="card card-bordered">
                <div className="card-header">
                  <h2 className="card-title">
                  </h2>
                </div>

                <div
                  className="ps-container ps-theme-default ps-active-y overFLOW"
                  id="chat-content"
                >
                  {storedValues.map((value, i) => {
                    return (
                      <QuesAnswer
                        ques={value.question}
                        answer={value.answer}
                        key={i}
                      />
                    );
                  })}
                  <div
                    className="ps-scrollbar-x-rail"
                    style={{ left: "0px", bottom: "0px" }}
                  >
                    <div
                      className="ps-scrollbar-x"
                      tabIndex="0"
                      style={{ left: "0px", width: "0px" }}
                    ></div>
                  </div>
                  <div
                    className="ps-scrollbar-y-rail"
                    style={{ top: "0px", height: "0px", right: "2px" }}
                  >
                    <div
                      className="ps-scrollbar-y"
                      tabIndex="0"
                      style={{ top: "0px", height: "2px" }}
                    ></div>
                  </div>
                </div>
                {loader === true ? (
                  <div className="publisher bt-1 border-light">
                    <img
                      className="avatar avatar-xs"
                      src="https://img.icons8.com/color/36/000000/administrator-male.png"
                      alt="..."
                    />
                    <input
                      className="publisher-input"
                      type="text"
                      placeholder="Ask Me Anything"
                      value={newQuestion}
                      disabled
                    />
                    <Bars
                      height="36"
                      width="36"
                      color="#4fa94d"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <div className="publisher bt-1 border-light">
                    <img
                      className="avatar avatar-xs"
                      src="https://img.icons8.com/color/36/000000/administrator-male.png"
                      alt="..."
                    />
                    <input
                      className="publisher-input"
                      type="text"
                      placeholder="Ask Me Anything"
                      value={newQuestion}
                      onChange={(e) => {
                        setNewQuestion(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        enterHandle(e);
                      }}
                    />
                    <button
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                      className="btn  btn-secondary"
                    >
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const QuesAnswer = ({ ques, answer }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < answer.length) {
      setTimeout(() => {
        setText(text + answer[index]);
        setIndex(index + 1);
      }, 2);
    }
  }, [index]);
  return (
    <>

      <div className="media media-chat media-chat-reverse">
        <div className="media-body">
          <p>{ques}</p>
        </div>
      </div>

      <div className="media media-chat">
        <img
          className="avatar"
          src="https://img.icons8.com/color/36/000000/administrator-male.png"
          alt="..."
        />
        <div className="media-body">
          <p  style={{whiteSpace: 'pre-line'}} >{ReactHtmlParser(answer)}</p>
        </div>
      </div>
    </>
  );
};

export default Chat;
