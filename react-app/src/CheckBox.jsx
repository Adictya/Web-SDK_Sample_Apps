import React from "react";

const toggle = (setStateFunc) => {
  setStateFunc((a) => !a);
};

const CheckBox = ({ state, setter }) => {
  const [keyName] = Object.keys(state);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        justifyContent: "center",
        marginInline: "5px",
      }}
    >
      <label>{keyName}</label>
      <input
        type="checkbox"
        value={`${state.keyName}`}
        onChange={() => {
          toggle(setter);
        }}
      />
    </div>
  );
};

export default CheckBox;
