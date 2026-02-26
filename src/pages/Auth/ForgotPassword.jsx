// import { Button, Input } from "antd";
// import Form from "antd/es/form/Form";
// import { useNavigate } from "react-router-dom";
// import { useForgotPasswordMutation } from "../../redux/features/authSlice";

// // import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";
// // import Swal from "sweetalert2";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [forgotPassword]= useForgotPasswordMutation()
//   // const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
//   const onFinish = async (values) => {
//     navigate(`/auth/verify-email`);
//     // try {
//     //   const response = await forgotPassword(values);
//     //   // console.log(response);
//     //   if (response?.data?.statusCode == 200) {
//     //     navigate(`/auth/verify-email/${values.email}`);
//     //   } else {
//     //     Swal.fire({
//     //       icon: "error",
//     //       title: "Failed!!",
//     //       text:
//     //         response?.data?.message ||
//     //         response?.error?.data?.message ||
//     //         "Something went wrong. Please try again later.",
//     //     });
//     //   }
//     // } catch (error) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Failed!!",
//     //     text: "Something went wrong. Please try again later.",
//     //   });
//     // }
//   };
//   return (
//     <div className="">
//       <div className="flex h-screen ">
//         {/* Background Image Section */}
//         <div
//           className="w-full bg-cover bg-center flex justify-center items-center bg-gradient-to-b from-blue-200 to-blue-100"
//           style={{
//             backgroundImage: "url('/login.png')", // Replace with your actual image path
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           {/* Sign-In Form Section */}
//           <div className="w-3/5  ">
//             <div
//               // style={{
//               //   background:
//               //     "linear-gradient(180deg, ##409cfe 100%, ##75b5df 43%)",
//               // }}
//               className=" shadow-lg bg-gradient-to-t to-[#409cfe]  from-[#75b5df] rounded-lg px-8 py-10 w-96"
//             >
//               {/* Form */}
//               <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
//                 Forgot Password
//               </h1>
//               <p className="text-center mb-4">
//                 Please enter your email address to reset your password.
//               </p>
//               <div className="mb-4">
//                 <Form
//                   name="normal_login"
//                   layout="vertical"
//                   initialValues={{
//                     remember: true,
//                   }}
//                   onFinish={onFinish}
//                 >
//                   <Form.Item
//                     name="email"
//                     rules={[
//                       {
//                         type: "email",
//                         message: "Please input valid email!",
//                       },
//                       {
//                         required: true,
//                         message: "Please input your email!",
//                       },
//                     ]}
//                   >
//                     <Input size="large" placeholder="Enter your email" />
//                   </Form.Item>
               
//                   <div className="w-full flex justify-center ">
//                     <Button
//                       type="solid"
//                       size="large"
//                       htmlType="submit"
//                       className="px-2 w-full text-white bg-playground"
//                     >
//                           Get OTP
//                     </Button>
//                   </div>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

// // <div className="border-r-0 lg:border-r-2 border-primary w-[99%] p-[8%] lg:p-[12%] lg:pr-0">
// // <img src={image} alt="" />
// // </div>
// // <div className="lg:p-[5%] order-first lg:order-last">
// // <div className="w-full py-[64px] lg:px-[44px] space-y-8">
// //   <div className="flex flex-col items-center lg:items-start">
// //     <PageHeading backPath={"/auth"} title={"Forgot Password"} disbaledBackBtn={true} />
// //     <p className="drop-shadow text-hash mt-4 text-center lg:text-start">
// //       Enter your email address to get a verification code for resetting
// //       your password. Please enter your email address to reset your
// //       password.
// //     </p>
// //   </div>
// // <Form
// //   name="normal_login"
// //   layout="vertical"
// //   initialValues={{
// //     remember: true,
// //   }}
// //   onFinish={onFinish}
// // >
// //   <Form.Item
// //     name="email"
// //     rules={[
// //       {
// //         type: "email",
// //         message: "Please input valid email!",
// //       },
// //       {
// //         required: true,
// //         message: "Please input your email!",
// //       },
// //     ]}
// //   >
// //     <Input size="large" placeholder="Enter your email" />
// //   </Form.Item>
// //   <div className="w-full flex justify-center pt-5">
// //       <Button
// //         // disabled={isLoading}
// //         type="primary"

// //         size="large"
// //         htmlType="submit"
// //         className="w-full px-2 bg-playground"
// //       >
// //         Get OTP
// //       </Button>
// //   </div>
// // </Form>
// // </div>
// // </div>


import { Button, Input, Form, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/features/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await forgotPassword(values).unwrap();
      message.success(response.message || "OTP has been sent to your email!");
      navigate(`/auth/verify-email?email=${values.email}`);
    } catch (error) {
      console.error("Forgot Password Error:", error);
      message.error(error.data?.message || "Failed to send OTP.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form Submission Failed:", errorInfo);
    message.error("Please check the form for errors.");
  };

  return (
    <div className="flex h-screen">
      {/* Background Image Section */}
      <div
        className="w-full bg-cover bg-center flex justify-center items-center bg-gradient-to-b from-blue-200 to-blue-100"
        style={{
          backgroundImage: "url('/login.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Forgot Password Form Section */}
        <div className="w-3/5">
          <div className="shadow-lg bg-gradient-to-t to-[#409cfe] from-[#75b5df] rounded-lg px-8 py-10 w-96">
            <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
              Forgot Password
            </h1>
            <p className="text-center mb-4 text-white">
              Please enter your email address to receive a reset password OTP.
            </p>

            <Form
              form={form}
              name="forgot_password"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[
                  { type: "email", message: "Please enter a valid email!" },
                  { required: true, message: "Email is required!" },
                ]}
              >
                <Input size="large" placeholder="Enter your email" />
              </Form.Item>

              <div className="w-full flex justify-center">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="px-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <Spin /> : "Get OTP"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
