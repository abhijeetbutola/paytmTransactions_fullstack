'use client';
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Link from "next/link";

function Signup() {
    return (
        <div className="bg-black/20 h-screen">
            <div className="h-full flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg">
                    <div className="flex flex-col items-center gap-2 pb-8">
                        <Text as="h1" className="font-bold text-4xl">Sign Up</Text>
                        <Text as="p" className="text-neutral-500 text-sm font-medium">Enter your information to create an account</Text>
                    </div>
                    <div>
                        <Input id={"firstName"} label={"First Name"} placeholder="John" className="w-full" />
                        <Input id={"lastName"} label={"Last Name"} placeholder="Doe" className="w-full" />
                        <Input id={"email"} label={"Email"} placeholder="johndoe@example.com" className="w-full" />
                        <Input id={"password"} label={"Password"} placeholder="****" className="w-full" />
                    </div>
                    <div className="pb-2">
                        <Button type="submit" variant="primary" className="w-full">Sign Up</Button>
                    </div>
                    <div className="flex justify-center">
                        <Text as="p">Already have an account?</Text>
                        <Link href={"/signin"}>
                            <Text as="p" className="underline cursor-pointer">Sign in</Text>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;