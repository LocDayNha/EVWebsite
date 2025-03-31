import React from 'react'

const TextInputText = (props) => {

    const { onChange, checkValidation } = props;

    return (
        <div className="w-full mt-1">
            <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">{props.title}</span>
            <div className="mt-1">
                <div
                    className={`flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 ${checkValidation === true ? "outline-red-500" : "outline-gray-300"} has-[input:focus-within]:outline-indigo-600"
                        `}
                >
                    <input
                        // id="email"
                        // name="email"
                        onChange={onChange}
                        type="text"
                        placeholder={props.placeholder}
                        className="block w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                </div>
            </div>
        </div>
    )
}

export default TextInputText