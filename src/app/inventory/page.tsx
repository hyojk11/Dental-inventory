'use client'

import Navbar from "@/components/Navbar";
import Leftside from "@/components/Leftside";
import Footer from "@/components/Footer";
import {useEffect, useState} from "react";
import api from "@/services/api";
import {useItemForm} from "@/hooks/useItemForm";

type Item = {
    id: number;
    category: string;
    itemname: string;
    manufacturer: string;
    quantity: number;
    status: string;
    etc: string;
}

export default function Inventory() {
    const [items, setItems] = useState<Item[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        category, setCategory,
        manufacturer, setManufacturer,
        itemname, setItemname,
        etc, setEtc,
        quantity, setQuantity,
        resetForm
    } = useItemForm();

    const statusKorean: { [key: string]: string } = {
        ACTIVE: "판매중",
        INACTIVE: "일시품절",
        DISCONTINUED: "단종",
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEditItem(false);
        setEditItemId(null);
        resetForm();
    }

    const [status, setStatus] = useState('ACTIVE');

    const [editItem, setEditItem] = useState(false);
    const [editItemId, setEditItemId] = useState<number | null>(null);

    const axiosItems = async () => {
        try {
            const response = await api.get('/items');
            setItems(response.data);
        } catch (error) {
            console.error('item list fail:',error);
        }
    };

    useEffect(() => {
        axiosItems();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (editItem && editItemId !== null) {
                await api.patch(`/items/${editItemId}`, {
                    category,
                    manufacturer,
                    itemname,
                    etc,
                    quantity,
                    status,
                });
                alert('재고가 수정되었습니다.');
            } else {
                await api.post('/items', {
                    category,
                    manufacturer,
                    itemname,
                    etc,
                    quantity,
                });
                alert("재고가 등록되었습니다.");
            }
            closeModal();
            axiosItems();
        } catch (error) {
            console.error("register item fail", error);
            const message = error.response?.data?.message || '재고 등록에 실패했습니다. 다시 시도해 주세요.';
            alert(message);
        }
    };

    const handleEditClick = (item: Item) => {
        setEditItem(true);
        setEditItemId(item.id);
        setCategory(item.category);
        setManufacturer(item.manufacturer);
        setItemname(item.itemname);
        setEtc(item.etc);
        setQuantity(item.quantity);
        setStatus(item.status);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                await api.delete(`/items/${id}`);
                alert('삭제되었습니다.');
                axiosItems();
            } catch (error) {
                console.error('delete item fail:',error);
                alert('삭제에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };


  return (
    <div className="flex min-h-screen">
        <Leftside />
        <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="h-16" />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">재고 현황</h1>
                    <button
                        onClick={openModal}
                        className="font-bold border-collapse border border-gray-700 text-gray-800 px-3 py-2 rounded hover:bg-gray-100"
                    >
                        재고 추가
                    </button>
                </div>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100 border">
                        <tr className="text-center">
                            <th className="py-2 border border-gray-300">카테고리</th>
                            <th className="py-2 border border-gray-300">제조사</th>
                            <th className="py-2 border border-gray-300">제품명</th>
                            <th className="py-2 border border-gray-300">기타 정보</th>
                            <th className="py-2 border border-gray-300">수량</th>
                            <th className="py-2 border border-gray-300">판매상태</th>
                            <th className="py-2 w-40 border border-gray-300">수정/삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="text-center">
                                <td className="py-2 border border-gray-300">{item.category}</td>
                                <td className="py-2 border border-gray-300">{item.manufacturer}</td>
                                <td className="py-2 border border-gray-300">{item.itemname}</td>
                                <td className="py-2 border border-gray-300">{item.etc}</td>
                                <td className="py-2 border border-gray-300">{item.quantity}</td>
                                <td className="py-2 border border-gray-300">{statusKorean[item.status]}</td>
                                <td className="py-2 border border-gray-300">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleEditClick(item)}
                                            className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteClick(item.id)}
                                            className="px-3 py-2 bg-gray-800 text-white rounded hover:bg-black"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <Footer />
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 w-96">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">재고 등록</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                      <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="border p-2 rounded"
                          required
                      >
                          <option value="">카테고리 선택</option>
                          <option value="보철재료">보철재료</option>
                          <option value="수복/접착">수복/접착</option>
                          <option value="수술/의약품">수술/의약품</option>
                          <option value="기타">기타</option>
                      </select>
                      <input
                          className="border p-2 rounded"
                          type="text"
                          value={manufacturer}
                          onChange={(e) => setManufacturer(e.target.value)}
                          placeholder="제조사"
                          required
                      />
                      <input
                          className="border p-2 rounded"
                          type="text"
                          value={itemname}
                          onChange={(e) => setItemname(e.target.value)}
                          placeholder="제품명"
                          required
                      />
                      <input
                          className="border p-2 rounded"
                          type="text"
                          value={etc}
                          onChange={(e) => setEtc(e.target.value)}
                          placeholder="기타 정보"
                      />
                      <input
                          className="border p-2 rounded"
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          placeholder="수량"
                          required
                      />
                      {editItem && (
                          <select
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="border p-2 rounded"
                              required
                          >
                              <option value="ACTIVE">판매중</option>
                              <option value="INACTIVE">일시품절</option>
                              <option value="DISCONTINUED">단종</option>
                          </select>
                      )}
                      <div className="flex space-x-2">
                          <button
                              type="submit"
                              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black">
                              저장
                          </button>
                          <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">취소</button>
                      </div>
                  </form>
                </div>
            </div>
        )}

    </div>
  );
}
