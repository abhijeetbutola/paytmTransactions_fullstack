'use client';

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import UserIcon from "@/components/users/UserIcon";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

function SendMoney() {
    const [amount, setAmount] = useState(0)
    
    const searchParams = useSearchParams()
    const name = searchParams.get("name") || "Unknown"
    const id = searchParams.get("id") || "Unknown"

    const [token, setToken] = useState("");
    
        useEffect(() => {
            // Ensure this code runs only in the client
            if (typeof window !== 'undefined') {
                const storedToken = localStorage.getItem("token");
                if (storedToken !== token) setToken(storedToken);
            }
        }, [token]);

    const handleInputAmount = (e) => {
        setAmount(e.target.value)
    }

    const handleTransferClick = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/account/transfer",
                {
                    to: id,
                    amount: amount
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
        } catch (error) {
            console.error("Error sending data: ", error)
        }
    }

    return (
        <div className="bg-black/20 h-screen">
            <div className="flex justify-center items-center h-full border border-green-800">
                <div className="bg-white flex flex-col gap-12 p-8 rounded-md min-w-96">
                    <div className="mx-auto">
                        <Text as="h1" className="font-bold text-4xl">Send Money</Text>
                    </div>
                    <div className="flex flex-col gap-2 justify-start w-full">
                        <div className="flex items-center gap-3">
                            <UserIcon letter={"Friend's"[0]}/>
                            <Text as="p" className="text-lg font-bold">{name}</Text>
                        </div>
                        <div>
                            <Text as="p">Amount (in Rs)</Text>
                        </div>
                        <div>
                            <Input className={"w-full"} type="number" placeholder="Enter amount" onChange={handleInputAmount} />
                        </div>
                        <div>
                            <Button variant="primary" className={"w-full"} onClick={handleTransferClick}>Initiate Transfer</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMoney;