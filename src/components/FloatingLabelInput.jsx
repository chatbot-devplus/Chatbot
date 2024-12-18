import React from 'react';

const FloatingLabelInput = () => {
  return (
    <div className="relative float-label-input" style={{ margin: '16px 0' }}>
      <input 
        type="text" 
        id="name" 
        placeholder=" " 
        className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-blue-400" 
      />
      <label 
        htmlFor="name" 
        className="absolute top-3 left-2 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white px-2"
        style={{
          transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
        }}
      >
        Email address
      </label>

      <style>
        {`
          .float-label-input:focus-within label,
          .float-label-input input:not(:placeholder-shown) + label {
            transform: translateY(-1.5rem) scale(0.75);
            background-color: white;
          }

          .float-label-input input:focus + label {
            transform: translateY(-1.5rem) scale(0.75);
            background-color: white;
          }
        `}
      </style>
    </div>
  );
};

export default FloatingLabelInput;
