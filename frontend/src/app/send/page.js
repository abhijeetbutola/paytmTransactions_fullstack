'use client';

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import UserIcon from "@/components/users/UserIcon";

function SendMoney() {
    return (
        <div className="bg-black/20 h-screen">
            <div className="flex justify-center items-center h-full border border-green-800">
                <div className="bg-white flex flex-col gap-12 p-8 rounded-md min-w-96">
                    <div className="mx-auto">
                        <Text as="h1" className="font-bold text-4xl">Send Money</Text>
                    </div>
                    <div className="flex flex-col gap-2 justify-start w-full">
                        <div className="flex items-center gap-4">
                            <UserIcon letter={"Friend's"[0]}/>
                            <Text as="p" className="text-lg font-bold">Friend&apos;s Name</Text>
                        </div>
                        <div>
                            <Text as="p">Amount (in Rs)</Text>
                        </div>
                        <div>
                            <Input className={"w-full"} placeholder="Enter amount" />
                        </div>
                        <div>
                            <Button variant="primary" className={"w-full"}>Initiate Transfer</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMoney;