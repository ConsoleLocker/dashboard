// import { Button, Input } from "antd";
// import Form from "antd/es/form/Form";
// import { useNavigate } from "react-router-dom";

// import {
//   LockOutlined,
//   EyeInvisibleOutlined,
//   EyeTwoTone,
// } from "@ant-design/icons";
// import { useResetPasswordMutation } from "../../redux/features/authSlice";
// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [resetPassword]=useResetPasswordMutation()
//   // const dispatch = useDispatch();
//   // const { token } = useSelector((state) => state.auth);
//   // const [mutation, { isLoading }] = useChangePasswordMutation();

//   const onFinish = async (values) => {
//     navigate("/");
//     // try {
//     //   const response = await mutation({
//     //     password: values.newPassword,
//     //     // token: token,
//     //   });
//     //   if (response?.data?.statusCode == 200) {
//     //     localStorage.setItem("verify-token", null);
//     //     dispatch(
//     //       setUser({
//     //         user: null,
//     //         token: null,
//     //       })
//     //     );
//     //     navigate("/auth");
//     //     Swal.fire({
//     //       icon: "success",
//     //       title: response?.data?.message,
//     //       showConfirmButton: false,
//     //       timer: 1000,
//     //     });
//     //   } else {
//     //     Swal.fire({
//     //       icon: "error",
//     //       title: "failed!",
//     //       text:
//     //         response?.data?.message ||
//     //         response?.error?.data?.message ||
//     //         "Something went wrong. Please try again later.",
//     //     });
//     //   }
//     // } catch (error) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Failed !!",
//     //     text: "Something went wrong.",
//     //   });
//     // }
//   };
//   return (
//     <div>
//       <div className="">
//         <div className="flex h-screen ">
//           {/* Background Image Section */}
//           <div
//             className="w-full bg-cover bg-center flex justify-center items-center bg-gradient-to-b from-blue-200 to-blue-100"
//             style={{
//               backgroundImage: "url('/login.png')", // Replace with your actual image path
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             {/* Sign-In Form Section */}
//             <div className="w-3/5  ">
//               <div className=" shadow-lg bg-gradient-to-t to-[#409cfe]  from-[#75b5df] rounded-lg px-8 py-10 w-96">
//                 {/* Form */}
//                 <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
//                   Reset Password
//                 </h1>
//                 <p className="text-center mb-4">
//                   Your password must be 8-10 character long.{" "}
//                 </p>
//                 <div className="mb-4">
//                   <Form
//                     name="normal_login"
//                     layout="vertical"
//                     initialValues={{
//                       remember: true,
//                     }}
//                     onFinish={onFinish}
//                   >
//                     <div className="mb-4 ">
//                       <Input.Password
//                         size="large"
//                         placeholder="Enter Password"
//                         prefix={<LockOutlined />}
//                         iconRender={(visible) =>
//                           visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                         }
//                         className="rounded-full "
//                       />
//                     </div>
//                     <div className="mb-4 ">
//                       <Input.Password
//                         size="large"
//                         placeholder="Re-enter Password"
//                         prefix={<LockOutlined />}
//                         iconRender={(visible) =>
//                           visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                         }
//                         className="rounded-full"
//                       />
//                     </div>
//                     <div className="w-full flex justify-center ">
//                       <Button
//                         type="solid"
//                         size="large"
//                         htmlType="submit"
//                         className="px-2 w-full text-white bg-playground"
//                       >
//                         Confirm
//                       </Button>
//                     </div>
//                   </Form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import { useState } from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useResetPasswordMutation } from "../../redux/features/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      const response = await resetPassword({
        password: values.password,
      }).unwrap();

      if (response.success) {
        message.success(response.message);
        
        navigate("/auth");
      } else {
        message.error(response.message || "Password reset failed!");
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Background Image Section */}
      <div
        className="w-full flex justify-center items-center bg-gradient-to-b from-blue-200 to-blue-100"
        style={{
          backgroundImage: "url('/login.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-3/5">
          <div className="shadow-lg bg-gradient-to-t to-[#409cfe] from-[#75b5df] rounded-lg px-8 py-10 w-96">
            <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
              Reset Password
            </h1>
            <p className="text-center mb-4">
              Your password must be 8-10 characters long.
            </p>

            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter a new password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-full"
                />
              </Form.Item>

              <div className="w-full flex justify-center">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="px-2 w-full"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Confirm
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
