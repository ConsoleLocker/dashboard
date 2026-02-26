import { Trash2, ToggleLeft, ToggleRight, Calendar } from "lucide-react";
import {
    useGetAllCouponsQuery,
    useToggleCouponStatusMutation,
    useDeleteCouponMutation
} from "../../../redux/features/couponApi";
import { toast } from "sonner";

const CouponTable = () => {
    const { data: coupons, isLoading } = useGetAllCouponsQuery(undefined);
    const [toggleStatus] = useToggleCouponStatusMutation();
    const [deleteCoupon] = useDeleteCouponMutation();

    const handleToggle = async (id) => {
        try {
            await toggleStatus(id).unwrap();
            toast.success("Stato aggiornato con successo");
        } catch (error) {
            toast.error("Errore nell'aggiornamento dello stato");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Sei sicuro di voler eliminare questo coupon?")) {
            try {
                await deleteCoupon(id).unwrap();
                toast.success("Coupon eliminato");
            } catch (error) {
                toast.error("Errore durante l'eliminazione");
            }
        }
    };

    if (isLoading) return <div className="p-10 text-center">Caricamento coupon...</div>;

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 font-semibold text-gray-600">Codice</th>
                        <th className="p-4 font-semibold text-gray-600">Valore</th>
                        <th className="p-4 font-semibold text-gray-600">Utilizzi</th>
                        <th className="p-4 font-semibold text-gray-600">Scadenza</th>
                        <th className="p-4 font-semibold text-gray-600">Stato</th>
                        <th className="p-4 font-semibold text-gray-600 text-right">Azioni</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {coupons?.data?.map((coupon) => (
                        <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-mono font-bold text-blue-600">{coupon.code}</td>
                            <td className="p-4 uppercase text-sm">
                                {coupon.discountType === 'percentage' ? `${coupon.value}%` : `€${coupon.value}`}
                            </td>
                            <td className="p-4 text-sm">
                                <span className="font-medium text-gray-700">{coupon.usedCount}</span>
                                <span className="text-gray-400"> / {coupon.usageLimit || '∞'}</span>
                            </td>
                            <td className="p-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : 'Mai'}
                                </div>
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {coupon.isActive ? 'Attivo' : 'Inattivo'}
                                </span>
                            </td>
                            <td className="p-4 text-right flex justify-end gap-3">
                                <button
                                    onClick={() => handleToggle(coupon._id)}
                                    className="hover:scale-110 transition-transform"
                                >
                                    {coupon.isActive ?
                                        <ToggleRight className="text-green-500" size={24} /> :
                                        <ToggleLeft className="text-gray-400" size={24} />
                                    }
                                </button>
                                <button
                                    onClick={() => handleDelete(coupon._id)}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CouponTable;