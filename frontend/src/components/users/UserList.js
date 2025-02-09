'use client';

import UserCard from "./UserCard";

const users = [
    {
        firstName: 'Abhi',
        lastName: 'Butola',
    },
    {
        firstName: 'Abhi',
        lastName: 'Butola',
    },
    {
        firstName: 'Abhi',
        lastName: 'Butola',
    },
    {
        firstName: 'Abhi',
        lastName: 'Butola',
    }
]

function UserList() {
    return (
        <div className="flex flex-col gap-4">
            {
                users.map((user, index) => {
                    return (
                        <UserCard key={index} firstName={user.firstName} lastName={user.lastName} />
                    )
                })
            }
        </div>
    )
}

export default UserList;