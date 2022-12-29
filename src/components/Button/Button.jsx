import React from 'react';

const Button = ({text}) => {
    return (
        <div>
            <input type="submit" value={text} className='btn bg-gray-700 px-6 py-2 rounded border cursor-pointer' />
        </div>
    );
};

export default Button;