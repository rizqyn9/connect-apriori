import React from 'react'

function Spinner() {
    return (
        <div className="w-9 text-gray-600">
            <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="spinner start"
                stroke="currentColor"
            >
                <circle cx="50" cy="50" r="46" />
            </svg>
        </div>
    )
}

export { Spinner }
