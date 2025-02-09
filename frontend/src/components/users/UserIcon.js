'use client';

function UserIcon({ letter }) {
    return (
        <div className="bg-green-600 flex justify-center items-center h-8 w-8 text-white font-semibold text-lg rounded-full">
            {letter.toUpperCase()}
        </div>
    )
}

export default UserIcon;