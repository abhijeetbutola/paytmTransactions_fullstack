'use client';

import Text from "../ui/Text";

function Navbar() {
    return (
        <div className="shadow-md border-b border-slate-400">
            <div className="flex justify-between px-2">
                <Text as="p" className="font-bold text-lg">Paytm App</Text>
                <Text as="p" className="font-medium text-lg">Hello</Text>
            </div>
        </div>
    )
}

export default Navbar;