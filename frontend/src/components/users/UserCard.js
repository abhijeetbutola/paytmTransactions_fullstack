'use client';

import Link from "next/link";
import Button from "../ui/Button";
import Text from "../ui/Text";
import UserIcon from "./UserIcon";

function UserCard({ id, firstName, lastName }) {

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <UserIcon letter={firstName[0]} />
                <Text>{firstName + " " + lastName}</Text>
            </div>
            <Link href={{pathname: "/send", query: {id: id, name: `${firstName} ${lastName}`}}} >
                <Button type="text">Send Money</Button>
            </Link>
        </div>
    )
}

export default UserCard