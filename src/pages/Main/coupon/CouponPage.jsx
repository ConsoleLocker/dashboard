import React, { useState } from 'react';
import CouponTable from './CouponTable';
import CreateCouponModal from './CreateCouponModal';
import { Plus } from 'lucide-react';

const Coupons = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestione Coupon</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 flex items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    <Plus size={20} /> Aggiungi Coupon
                </button>
            </div>

            <CouponTable />

            {isModalOpen && (
                <CreateCouponModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default Coupons;