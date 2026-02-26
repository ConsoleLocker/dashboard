

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import profileImage from "../../assets/images/dash-profile.png";
import { TbBellRinging } from "react-icons/tb";
import { useGetAllNotificationQuery } from "../../redux/features/notificationSlice";


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const { data } = useGetAllNotificationQuery();

  const unreadCount = data?.data?.notifications?.filter(
    (notification) => notification.isRead === false
  ).length || 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [location.pathname]);

  useEffect(() => {
    const userData = localStorage.getItem('admin');
    if (userData) {
      const parsedUserInfo = JSON.parse(userData);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMAGE}${imagePath}`;
  };

  return (
    <div className="w-full h-[88px] flex justify-between items-center rounded-sm py-[16px] px-[32px] shadow-lg bg-white">
      <div className="text-start space-y-0.5">
        <p className="text-sm md:text-xl font-light">
          {"Welcome, " + (userInfo ? userInfo.name : "Jane Cooper")}
        </p>
        <p className="text-sm md:text-xl">{"Have a nice day!"}</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "#000000", width: '20px', height: '20px', objectFit: 'contain' }} count={unreadCount}>
            <TbBellRinging
              style={{ cursor: "pointer" }}
              className={` w-6 h-6 rounded-full shadow-sm  font-bold transition-all`}
            />
          </Badge>
        </div>
        <Link to={'/settings/profile'} className="flex items-center">
          <div>
            <img src={getImageSrc(userInfo?.avatar)} alt="" className="rounded-full h-[42px] w-[42px]" />
          </div>

          {/* <h1> {(userInfo ? userInfo.name : "Jane Cooper")}</h1> */}
          {/* <Select
            defaultValue={userInfo ? userInfo.name : "Jane Cooper"}
            style={{
              width: 120,
            }}
            bordered={false}
            suffixIcon={<MdOutlineKeyboardArrowDown color="black" fontSize={20} />}
            onChange={handleChange}
            options={[
              {
                value: userInfo ? userInfo.name : "Jane Cooper",
                label: 'Jane Cooper',
              },
              // {
              //   value: 'lucy',
              //   label: 'Lucy',
              // }
            ]}
          /> */}
        </Link>
      </div>
    </div>
  );
};

export default Header;

// import { useEffect, useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Badge } from "antd";
// import profileImage from "../../assets/images/dash-profile.png";
// import { TbBellRinging } from "react-icons/tb";
// import { useGetAllNotificationQuery } from "../../redux/features/notificationSlice";

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const notificationRef = useRef(null);
//   const [notificationPopup, setNotificationPopup] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);

//   const { data } = useGetAllNotificationQuery();
//   const notifications = data?.data?.notifications || [];
//   const unreadNotifications = notifications.filter(notification => !notification.isRead);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setNotificationPopup(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     setNotificationPopup(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const userData = localStorage.getItem('admin');
//     if (userData) {
//       const parsedUserInfo = JSON.parse(userData);
//       setUserInfo(parsedUserInfo);
//     }
//   }, []);

//   const IMAGE = import.meta.env.VITE_IMAGE_API;

//   return (
//     <div className="w-full h-[88px] flex justify-between items-center rounded-sm py-[16px] px-[32px] shadow-lg bg-white">
//       <div className="text-start space-y-0.5">
//         <p className="text-sm md:text-xl font-light">
//           {"Welcome, " + (userInfo ? userInfo.name : "Jane Cooper")}
//         </p>
//         <p className="text-sm md:text-xl">{"Have a nice day!"}</p>
//       </div>
//       <div className="flex gap-x-[41px]">
//         <div
//           onClick={() => setNotificationPopup(!notificationPopup)}
//           className="relative flex items-center"
//         >
//           <Badge
//             style={{ backgroundColor: "#000000", width: '20px', height: '20px', objectFit: 'contain' }}
//             count={unreadNotifications.length}
//           >
//             <TbBellRinging
//               style={{ cursor: "pointer" }}
//               className={`w-6 h-6 rounded-full shadow-sm font-bold transition-all`}
//             />
//           </Badge>
//           {notificationPopup && (
//             <div
//               ref={notificationRef}
//               className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-64 max-h-64 overflow-y-auto"
//             >
//               {notifications.map((notification) => (
//                 <div
//                   key={notification._id}
//                   className="p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => navigate(`/notifications/${notification._id}`)}
//                 >
//                   <p className={`text-sm ${notification.isRead ? 'text-gray-500' : 'text-black font-semibold'}`}>
//                     {notification.subject}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     {new Date(notification.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <Link to={'/settings/profile'} className="flex items-center">
//           <div>
//             <img
//               src={`${IMAGE}${userInfo?.avatar}`}
//               alt=""
//               className="rounded-full h-[42px] w-[42px]"
//             />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Header;