'use client';
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

function Signin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    const handleSignInClick = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/signin", {
                username: formData.email,
                password: formData.password
            })

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            console.error("Error fetching data: ", error);
            
        }
    }

    return (
        <div className="bg-black/20 h-screen">
            <div className="h-full flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg">
                    <div className="flex flex-col items-center gap-2 pb-8">
                        <Text as="h1" className="font-bold text-4xl">Sign In</Text>
                        <Text as="p" className="text-neutral-500 text-sm font-medium">Enter your credentials to access your account</Text>
                    </div>
                    <div>
                        <Input id={"email"} name={"email"} label={"Email"} placeholder="johndoe@example.com" className="w-full" onChange={handleInputChange} />
                        <Input id={"password"} name={"password"} label={"Password"} placeholder="****" className="w-full" onChange={handleInputChange} />
                    </div>
                    <div className="pb-2">
                        <Button type="submit" variant="primary" className="w-full" onClick={handleSignInClick}>Sign In</Button>
                    </div>
                    <div className="flex justify-center">
                        <Text as="p">Don&apos;t have an account?</Text>
                        <Link href={"/signup"}>
                            <Text as="p" className="underline cursor-pointer">Sign up</Text>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;