import React from 'react'

const Loader = () => {

    return (
        <div class="relative w-8 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-900 shadow-lg animate-spin-slow">

            <div class="absolute w-2 h-1 bg-green-400 rounded-full top-1.5 left-3 transform rotate-[20deg]"></div>
            <div class="absolute w-1.5 h-0.5 bg-green-500 rounded-full top-2.5 left-5 transform rotate-[45deg]"></div>
            <div class="absolute w-1.5 h-1 bg-green-300 rounded-full top-1 left-1.5 transform rotate-[10deg]"></div>
            <div class="absolute w-1 h-0.5 bg-green-400 rounded-full bottom-2 right-4 transform rotate-[60deg]"></div>
            <div class="absolute w-1.5 h-0.5 bg-green-500 rounded-full bottom-1.5 right-2 transform rotate-[15deg]"></div>
            <div class="absolute inset-0 rounded-full bg-black opacity-20 blur-md"></div>
        </div>
    )
}

export default Loader
