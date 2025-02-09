'use client';

import Navbar from "@/components/layout/Navbar";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import UserList from "@/components/users/UserList";

function Dashboard() {
    return (
        <div className="px-4 flex flex-col gap-4">
            <Navbar />
            <div className="flex flex-col gap-3 px-8">
                <div>
                    <Text as="p" className="font-bold">Your balance is: 10,000</Text>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <Text>Users</Text>
                        <Input className={"w-full"} placeholder="Search users..."></Input>
                    </div>
                    <div>
                        <UserList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;