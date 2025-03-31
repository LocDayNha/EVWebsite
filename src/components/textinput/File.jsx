import React from 'react'

const TextInputFile = (props) => {

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
                        id="file_input"
                        onChange={onChange}
                        type="file"
                        placeholder={props.placeholder}
                        aria-describedby="file_input_help"
                        className="block w-full text-sm text-gray-800 grow py-1.5 pr-3 pl-1 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                </div>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG</p>
            </div>
        </div>
    )
}

export default TextInputFile