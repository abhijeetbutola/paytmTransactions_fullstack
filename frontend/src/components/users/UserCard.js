'use client';

import Button from "../ui/Button";
import Text from "../ui/Text";
import UserIcon from "./UserIcon";

function UserCard({ firstName, lastName }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <UserIcon letter={firstName[0]} />
                <Text>{firstName + " " + lastName}</Text>
            </div>
            <Button type="text">Send Money</Button>
        </div>
    )
}

export default UserCard