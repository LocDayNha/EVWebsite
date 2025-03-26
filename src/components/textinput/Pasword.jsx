import React, { useState } from 'react';

const TextInputPassword = (props,) => {

  const { onChange, checkValidation } = props;

  return (
    <div class="w-full mt-2">
      <span class="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">{props.title}</span>
      <div className="mt-1">
        <div
          className={`flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 ${checkValidation === true ? "outline-red-500" : "outline-gray-300"} has-[input:focus-within]:outline-indigo-600"
                    `}
        >
          <input
            id="password"
            name="password"
            onChange={onChange}
            type="password"
            placeholder="Enter password"
            className="block w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
};

export default TextInputPassword;
