import React from "react";

function TextList({ list, emptyMessage, isDraw }) {
  return (
    <>
      {!list ? ( 
        <>
          <strong>{emptyMessage}</strong>
        </>
      ) : (
        list.map((item, index) => {
          const { key, value } = item;
          if (index === 0 && !isDraw) {
            return <h3><span className={"predicted-key"}>{key}</span>: {value}</h3>
          } 
          return (
            <>
            { 
            isDraw && index === 0 && <h3>{"Probabilidades empatadas: "}</h3>
            }
            <span
            style={{opacity: value / 2}}
              className={"style-tag"}
              key={index}>
              <strong>
                {key}
              </strong>
              <span>
              : {value}
              </span>
            </span>
            {"  "}</>
          );
        })
      )}
    </>
  );
}

export default TextList;
