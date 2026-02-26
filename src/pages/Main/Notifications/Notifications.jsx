import { FaAngleLeft } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGetAllNotificationQuery, useMarkAsReadMutation } from "../../../redux/features/notificationSlice";

const Notifications = () => {
  const navigate = useNavigate();
  const { data } = useGetAllNotificationQuery();
  const [markAsRead] = useMarkAsReadMutation();

  const handleNotificationClick = async (id) => {
    try {
      await markAsRead(id).unwrap();
      navigate(`/notifications/${id}`);
    } catch (error) {
      console.error("Errore durante l'aggiornamento della notifica:", error);
      navigate(`/notifications/${id}`);
    }
  };

  return (
    <div className="rounded-lg min-h-screen bg-[#FDFDFD]">
      <div className="px-[32px] py-6 text-white bg-info rounded-t-lg flex items-center gap-3">
        <FaAngleLeft onClick={() => navigate(-1)} className="text-white cursor-pointer" size={34} />
        <h1 className="text-[30px] text-[#052255] font-bold">All Notifications</h1>
      </div>

      <div className="p-[24px]">
        {data?.data?.notifications?.length > 0 ? (
          data.data.notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleNotificationClick(notification._id)}
              className={`group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50 transition-all hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
                }`}
            >
              <div className="relative">
                <IoIosNotificationsOutline
                  className="w-[42px] h-[42px] rounded-lg p-1.5 shadow-sm bg-[#B2DAC4] text-info"
                />
                {/* Un piccolo pallino se la notifica è nuova */}
                {!notification.isRead && (
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
                )}
              </div>

              <div className="space-y-[2px] flex-1">
                <h6 className={`text-lg ${!notification.isRead ? 'font-bold text-[#052255]' : 'font-normal text-gray-700'}`}>
                  {notification.subject}
                </h6>
                <small className="text-[12px] text-gray-500">
                  {new Date(notification.createdAt).toLocaleString('it-IT')}
                </small>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No notifications found</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;