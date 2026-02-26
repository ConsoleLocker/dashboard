// import  { useState } from "react";
// import { Button, Form, Input } from "antd";
// import dashProfile from "../../assets/images/dashboard-profile.png";
// import { Outlet, useNavigate } from "react-router-dom";
// import PhoneCountryInput from "../../Components/PhoneCountryInput";
// import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
// import { FaAngleLeft } from "react-icons/fa6";
// import { FaRegEdit } from "react-icons/fa";

// const MyProfile = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const data = localStorage.getItem("admin");
//   console.log(data.name)

//   const profileData = {
//     name: "Jane Kooper",
//     email: "enrique@gmail.com",
//     phone: "+880 1550597212",
//     profile: dashProfile,
//   };
//   // console.log(code);
//   return (
//     <>
//       <div className="flex items-center gap-2 text-xl">
//         <FaAngleLeft />
//         <h1>Personal information</h1>
//       </div>
//       <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
//         <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
//           Personal information
//         </h3>
//         <div>
//           <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">

//             <div className="w-full">

//               <div className="py-4 px-8 flex justify-end items-center">
//                 {/* <h6 className="text-2xl text-white">Personal Information</h6> */}
//                 <Button
//                   onClick={(e) => navigate(`edit`)}
//                   size="large"
//                   type="default"
//                   className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
//                 >
//                   <FaRegEdit />
//                   Edit Profile
//                 </Button>
//               </div>

//               <Form
//                 name="basic"
//                 layout="vertical"
//                 className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
//                 autoComplete="off"
//                 initialValues={{
//                   name: profileData.name,
//                   email: profileData.email,
//                 }}
//               >
//                 <div className="col-span-3 space-y-6 ">
//                   <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
//                     <div className="my-2">
//                       <img
//                         src={dashProfile}
//                         alt=""
//                         className="h-28 w-28 rounded-full border-4 border-black"
//                       />
//                     </div>
//                     <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
//                     <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
//                   </div>

//                 </div>
//                 <div className="col-span-9 space-y-[14px] w-full">
//                   <Form.Item
//                     className="text-lg  font-medium text-black -mb-1"
//                     label="Name"
//                     name="name"
//                   >
//                     <Input
//                       readOnly
//                       size="large"
//                       className="h-[53px] rounded-lg"
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     className="text-lg  font-medium text-black"
//                     label="Email"
//                     name="email"
//                   >
//                     <Input
//                       readOnly
//                       size="large"
//                       className="h-[53px] rounded-lg"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     className="text-lg text-[#222222] font-medium"
//                     label="Phone Number"
//                     name="phone"
//                   >
//                     <PhoneCountryInput />
//                   </Form.Item>
//                 </div>
//               </Form>
//             </div>
//             <PasswordChangeModalForm
//               isModalOpen={isModalOpen}
//               setIsModalOpen={setIsModalOpen}

//             />
//           </div>
//         </div>
//         <div className="p-[24px] pt-0.5">
//           <Outlet />
//         </div>
//       </div>

//     </>
//   );
// };

// export default MyProfile;

import { useState } from "react";
import { Button, Form, Input } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Retrieve and parse data from localStorage
  const storedData = localStorage.getItem("admin");
  const adminData = storedData ? JSON.parse(storedData) : null;

  const profileData = {
    name: adminData?.name || "Jane Kooper",
    email: adminData?.email || "enrique@gmail.com",
    phone: adminData?.phone || "+880 1550597212",
    profile: adminData?.avatar || dashProfile,
  };

  const IMAGE = import.meta.env.VITE_IMAGE_API;
  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMAGE}${imagePath}`;
  };

  return (
    <>
      <Link to={'/settings'} className="flex items-center gap-2 text-xl">
        <FaAngleLeft />
        <h1>Personal information</h1>
      </Link>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
          Personal information
        </h3>
        <div>
          <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
            <div className="w-full">
              <div className="py-4 px-8 flex justify-end items-center">
                <Button
                  onClick={(e) => navigate(`edit`)}
                  size="large"
                  type="default"
                  className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                >
                  <FaRegEdit />
                  Edit Profile
                </Button>
              </div>

              <Form
                name="basic"
                layout="vertical"
                className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
                autoComplete="off"
                initialValues={{
                  name: profileData.name,
                  email: profileData.email,
                }}
              >
                <div className="col-span-3 space-y-6 ">
                  <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                    <div className="my-2">
                      <img
                        // src={profileData.profile}
                        src={getImageSrc(profileData.profile)}
                        alt=""
                        className="h-28 w-28 rounded-full border-4 border-black"
                      />
                      {/* <img
                        src={`${IMAGE}${product.product?.image}`}
                        alt={product.product.name}
                      /> */}
                    </div>
                    <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
                    <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
                  </div>
                </div>
                <div className="col-span-9 space-y-[14px] w-full">
                  <Form.Item
                    className="text-lg  font-medium text-black -mb-1"
                    label="Name"
                    name="name"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg  font-medium text-black"
                    label="Email"
                    name="email"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    className="text-lg text-[#222222] font-medium"
                    label="Phone Number"
                    name="phone"
                  >
                    <PhoneCountryInput />
                  </Form.Item>
                </div>
              </Form>
            </div>
            <PasswordChangeModalForm
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
