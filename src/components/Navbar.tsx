'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('로그아웃 되었습니다.');
        router.push('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md h-16 flex items-center justify-between px-8 z-50">
            <Link href="/inventory">
                <Image
                    src="/assets/smiletapWhite.png"
                    alt="smiletap logo"
                    width={180}
                    height={180}
                    priority
                />
            </Link>
            <div className="flex items-center space-x-6">
                <Link href="#" className="hover:text-gray-400">
                    My Page
                </Link>
                <button onClick={handleLogout} className="hover:text-gray-400">
                    Logout
                </button>
            </div>
        </nav>
    );
}
