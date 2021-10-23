import React, { useState, useEffect } from "react";
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Input from "./components/Inputs/TextArea";
import TextList from "./components/Outputs/TextList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub } from 'react-icons/fa';


import { postLyrics } from "./utils/_axio";
import { isAllEqual } from "./utils";

import "./App.css";

function App() {
  const [response, setResponse] = useState({ error: false });
  const [probs, setProbs] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (lyrics) postLyrics(lyrics, setResponse);
  }, [lyrics]);

  useEffect(() => {
    const filteredProbs = response.proba
      ? response.proba.map((prob) => {
          const [key, value] = Object.entries(prob)[0];
          return {
            key,
            value: (100.0 * value).toFixed(1)
          };
        })
      : [];

    setProbs(filteredProbs.sort((probA, probB) => 
    probB.value - probA.value
      )
    );

    if (response.error) {
      setDisabled(true);
      setResponse({ error: false });
      setLyrics("");
    }
  }, [response]);

  return (
    <div className="App">
          <Navbar bg="dark">
            <Container>
              <Navbar.Brand><span className={'yelo'}>.lyri</span>classify<span className={"yelo"}>{'</>'}</span></Navbar.Brand>
            </Container>
          </Navbar>
      <div className="App-main">
        <Container>
            {!response.error ?(
              <>
                <Row>
                  <Col className={'mt-5'}>
                    <h1>Song Lyrics<span className={"yelo"}> Classifier</span></h1>
                    <p
                      className={"mb-5"}>Digite ou cole uma letra de música (PT-BR) no editor abaixo para que o modelo tente definir entre os estilos disponíveis:</p>
                    { !!lyrics && 
                      <TextList 
                      list={probs}
                      emptyMessage="Nada calculado ainda."
                      isDraw={isAllEqual(probs)}
                      />
                    }
                  </Col>
                  <Col 
                    md={"12"}
                    className={'mt-3'}>
                    <Input
                        value={lyrics}
                        setValue={setLyrics}
                        name="music-lyrics"
                        id="music-lyrics"
                        placeholder={disabled ? "Api offline..." : "Cole a letra ou escreva pra acompanhar as predições em tempo real"}
                        disabled={disabled}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <h3 id="post-result">Wait...</h3>
            )}
                    <Navbar bg="dark"
        className={"fixed-bottom"}>
            <Container>
              <Navbar.Brand><span className={'yelo'} href="https://github.com/vaziozio/song-lyrics-classifier"><FaGithub></FaGithub> vaziozio github</span></Navbar.Brand>
            </Container>
          </Navbar>
        </Container>
      </div>
    </div>
  );
}

export default App;
