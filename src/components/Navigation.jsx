import React from "react";
const Navigation = props => {
  const quantity = props.pageQuantity;
  const pageCallback = props.pageCallback;
  const page = props.page;

  const createButtons = () => {
    const buttons = [];
    for (let index = 1; index <= quantity; index++) {
      buttons.push(
        <button
          key={index}
          disabled={index === page}
          onClick={() => pageCallback(index)}
        >
          {index}
        </button>
      );
    }
    return buttons;
  };

  return <div>{createButtons()}</div>;
};
export default Navigation;
