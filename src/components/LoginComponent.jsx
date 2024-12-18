import React from 'react';
import Logo from '../assets/images/Logo.png';
import FloatingLabelInput from './FloatingLabelInput';  
 
const LoginComponent = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <img 
                    src={Logo} 
                    alt="Centered Image" 
                    className="w-20"
                />
            </div>
            <h1 className="text-gray-900 pb-5 text-4xl text-bold text-center">Create your account</h1>
            <div className="relative float-label-input">
                <FloatingLabelInput />  
            </div>
            <button 
                type="button" 
                className="mb-3 focus:outline-none text-white bg-[#10A37F] hover:bg-[#0E8D6F] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 dark:bg-[#0E8D6F] dark:hover:bg-[#0C7B5E] dark:focus:ring-[#085F4A]">
                Continue
            </button>

            <span className="text-gray-900 mb-3 ">
                Already have an account? 
                <a href="#" className="text-[#10A37F] font-bold"> Login</a>
            </span>
            
            <div className="flex items-center justify-center my-4">
                <hr className="w-full border-gray-300" />
                <span className="px-3 text-gray-500 font-medium">OR</span>
                <hr className="w-full border-gray-300" />
            </div>
            <button 
                type="button" 
                className="text-gray-900 bg-white border border-gray-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full 
                    flex items-center justify-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#4285F4" d="M24 9.5c3.34 0 6.35 1.16 8.74 3.08l6.52-6.52C35.04 2.12 29.92 0 24 0 14.64 0 6.63 5.36 2.89 13.13l7.89 6.13C12.13 12.67 17.5 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.27 24.56c0-1.6-.13-3.13-.37-4.56H24v9h12.67c-.88 4.45-3.6 8.21-7.26 10.49l7.89 6.13C43.76 41.29 46.27 33.5 46.27 24.56z"/>
                    <path fill="#FBBC05" d="M10.78 28.74a14.4 14.4 0 01-7.55-8.48L2.89 13.13a23.95 23.95 0 000 21.74l7.89-6.13z"/>
                    <path fill="#EA4335" d="M24 46.27c6.5 0 11.92-2.12 15.89-5.78l-7.89-6.13c-2.16 1.45-4.92 2.29-8 2.29-6.5 0-11.87-4.17-13.89-10.04l-7.89 6.13C8.13 40.9 15.14 46.27 24 46.27z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                <span className="text-gray-900 font-medium ml-3">Sign in with Google</span>
            </button>
            <button 
                type="button" 
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full flex items-center justify-center">
                 <svg 
                    className="w-4 h-4 me-2" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="#1877F2">
                    <path 
                        d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.407.595 24 1.325 24h11.495v-9.294H9.69v-3.622h3.13V8.413c0-3.1 1.892-4.788 4.657-4.788 1.324 0 2.462.099 2.794.143v3.24l-1.917.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.593 1.325-1.326V1.326C24 .593 23.405 0 22.675 0z"
                    />
                </svg>
                <span className="text-gray-900 font-medium"> Sign in with Facebook</span>
            </button>
        </div>  
    );
};
export default LoginComponent;
