'use client';

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import api from "@/services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await api.post("/auth/signin", {
                email,
                password,
            });
            const token = response.data.accessToken;
            localStorage.setItem("token", token);
            console.log("login success", response.data);
            alert("성공적으로 로그인 되었습니다.");
            router.push("/inventory");
        } catch (error) {
            console.error("login fail", error);
            alert("이메일이나 비밀번호가 맞지 않습니다.");
        }
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col row-start-2 items-center sm:items-start">
                <Link href="/">
                    <Image
                        src="/assets/smiletapBlack.png"
                        alt="smiletap logo"
                        width={150}
                        height={150}
                        priority
                    />
                </Link>
                <div className="p-8 border border-solid border-black/[.08]  `dark:border-white/[.145] rounded-2xl shadow-md w-full max-w-md">
                <h1 className="mb-8 text-2xl font-bold text-center">로그인</h1>
                    <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold">이메일</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요."
                                className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-md w-full p-2 mb-4"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold">비밀번호</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요."
                                className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-md w-full p-2 mb-8"
                                required
                            />
                        </div>
                        <div className="flex gap-4 items-center flex-col sm:flex-row">
                            <button
                                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-[158px]"
                                type="submit"
                            >
                                로그인
                            </button>
                            <Link
                                className="rounded-full border border-solid border-black/[.2] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-[158px]"
                                href="/"
                            >
                                처음으로
                            </Link>
                        </div>
                    </form>
                    </div>
                </div>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            </footer>
        </div>
    );
}
