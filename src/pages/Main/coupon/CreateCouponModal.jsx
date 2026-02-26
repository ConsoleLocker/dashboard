import { useState } from "react";
import { X } from "lucide-react";
import { useCreateCouponMutation } from "../../../redux/features/couponApi";
import { toast } from "sonner";

const CreateCouponModal = ({ onClose }) => {
    const [createCoupon, { isLoading }] = useCreateCouponMutation();
    const [formData, setFormData] = useState({
        code: "",
        discountType: "percentage",
        value: "",
        expiryDate: "",
        usageLimit: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                value: Number(formData.value),
                usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
                expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : undefined,
            };

            await createCoupon(payload).unwrap();
            toast.success("Coupon creato con successo!");
            onClose();
        } catch (err) {
            toast.error(err?.data?.message || "Errore durante la creazione");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-6 text-gray-800">Crea Nuovo Coupon</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Codice Coupon</label>
                        <input
                            required
                            type="text"
                            placeholder="es. SUMMER2024"
                            className="w-full border rounded-lg p-2 uppercase focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Sconto</label>
                            <select
                                className="w-full border rounded-lg p-2 outline-none"
                                value={formData.discountType}
                                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                            >
                                <option value="percentage">Percentuale (%)</option>
                                <option value="fixed">Fisso (€)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Valore</label>
                            <input
                                required
                                type="number"
                                placeholder="es. 10"
                                className="w-full border rounded-lg p-2 outline-none"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data di Scadenza (Opzionale)</label>
                        <input
                            type="date"
                            className="w-full border rounded-lg p-2 outline-none"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Limite Utilizzi (Opzionale)</label>
                        <input
                            type="number"
                            placeholder="Lascia vuoto per illimitati"
                            className="w-full border rounded-lg p-2 outline-none"
                            value={formData.usageLimit}
                            onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                    >
                        {isLoading ? "Creazione in corso..." : "Crea Coupon"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCouponModal;