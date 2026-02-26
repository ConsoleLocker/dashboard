import { useParams, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
// Importiamo il hook specifico per la singola notifica
import { useGetSingleNotificationQuery } from "../../../redux/features/notificationSlice";

const NotificationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Recuperiamo solo i dati di questa specifica notifica
    const { data, isLoading, isError } = useGetSingleNotificationQuery(id);

    // Gestione stati di caricamento ed errore
    if (isLoading) return <div className="p-8 text-center">Caricamento in corso...</div>;
    if (isError || !data?.data) return <div className="p-8 text-center text-red-500">Messaggio non trovato</div>;

    const notification = data.data;

    return (
        <div className="rounded-lg min-h-screen bg-[#FDFDFD]">
            {/* Header con pulsante torna indietro */}
            <div className="px-[32px] py-6 text-white bg-info rounded-t-lg flex items-center gap-3">
                <FaAngleLeft onClick={() => navigate(-1)} className="text-white cursor-pointer" size={34} />
                <h1 className="text-[30px] text-[#052255] font-bold">Dettaglio Messaggio</h1>
            </div>

            <div className="p-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-[#052255] mb-2">
                        {notification.subject || "Senza Oggetto"}
                    </h2>

                    <div className="flex flex-col md:flex-row md:justify-between border-b pb-4 mb-6">
                        <div className="space-y-1">
                            <p className="text-lg font-medium text-gray-800">
                                <span className="text-gray-500 font-normal">Da:</span> {notification.name}
                            </p>
                            <p className="text-blue-600">
                                <span className="text-gray-500 font-normal">Email:</span> {notification.email}
                            </p>
                        </div>
                        <div className="text-gray-400 text-sm mt-2 md:mt-0">
                            {new Date(notification.createdAt).toLocaleString('it-IT')}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-md border border-gray-200 min-h-[200px]">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {notification.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationDetail;