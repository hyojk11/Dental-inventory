'use client';

import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import api from "@/services/api";
import Image from "next/image";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username.length < 3) {
            alert("이름은 3자 이상 입력해야 합니다.");
            return;
        }
        if (password.length < 4) {
            alert("비밀번호는 최소 4자 이상이어야 합니다.");
            return;
        }

        try{
            const response = await api.post("/auth/signup", {
                email,
                username,
                password,
            });
            console.log("register success", response.data);
            alert("회원가입이 완료되었습니다.");
            router.push("/login");
        } catch (error) {
            console.error("register fail", error);
            if (error.response.status === 409) {
                alert("이미 사용 중인 이메일입니다.");
            } else {
                alert("회원가입에 실패했습니다.");
            }
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col row-start-2 items-center sm:items-start">
                <Image
                    src="/assets/smiletapBlack.png"
                    alt="smiletap logo"
                    width={150}
                    height={150}
                    priority
                />
                <div className="p-8 border border-solid border-black/[.08]  `dark:border-white/[.145] rounded-2xl shadow-md w-full max-w-md">
                    <h1 className="mb-8 text-2xl font-bold text-center">회원가입</h1>
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
                                <label className="block text-gray-700 text-sm font-bold">이름</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="이름을 입력하세요."
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
                                    회원가입
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
