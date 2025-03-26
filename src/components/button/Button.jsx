import React from "react";

const Button = (props) => {

  const { onClick } = props;

  return (
    <div className="w-full mt-5">
      <button onClick={onClick} className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-2xl w-full hover:bg-green-700 transition">
        {props.title}
      </button>
    </div>
  );
};

export default Button;
