'use client';

import Link from 'next/link';

export default function Leftside() {
    return (
        <aside className="w-60 bg-gray-800 text-white flex flex-col justify-start items-start p-12">
            <nav className="flex flex-col space-y-6 mt-12">
                <Link href="/inventory" className="hover:text-gray-400 text-lg">
                    Inventory
                </Link>
            </nav>
        </aside>
    );
}
