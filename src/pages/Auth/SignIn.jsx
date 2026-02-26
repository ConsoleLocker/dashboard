// import { Button, Checkbox, Input } from "antd";
// import Form from "antd/es/form/Form";
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import image from "../../assets/images/reset-pass.png";
// import { useDispatch } from "react-redux";
// import { usePostLoginMutation } from "../../redux/features/Auth/authApi";
// import { setUser } from "../../redux/features/Auth/authSlice";
// import Swal from "sweetalert2";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   // const dispatch = useDispatch();
//   // const [setData, { isLoading }] = usePostLoginMutation();
  // const onFinish = async (values) => {
  //   navigate(location.state ? location.state : "/");
  //   try {
  //     const response = await setData(values);
  //     // console.log(response);
  //     if (response?.data?.statusCode == 200) {
  //       if (response?.data?.data?.user?.role === "ADMIN") {
  //         localStorage.setItem("token", response?.data?.data?.token);
  //         dispatch(
  //           setUser({
  //             user: response?.data?.data?.user,
  //             token: response?.data?.data?.token,
  //           })
  //         );
  //         // navigate(from, { replace: true });
  //         navigate(location.state ? location.state : "/");
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Login Failed!!",
  //           text: "You are not a Valid",
  //         });
  //       }
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title:
  //           response?.data?.message ||
  //           response?.error?.data?.message ||
  //           "Login Failed!!",
  //         text: "Something went wrong. Please try again later.",
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Login Failed!!",
  //       text: "Something went wrong. Please try again later.",
  //     });
  //   }
  // };
//   return (
//     <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
//       <div className="lg:border-r-2 border-primary mx-auto w-[92%] lg:p-[15%] lg:pr-[20%] ">
//         <img src={image} alt="" />
//       </div>
//       <div className="lg:p-[5%] order-first lg:order-last">
//         <div className="w-full py-[44px] lg:px-[44px]">
//           <div className="pb-[30px] space-y-2">
//             <h1 className="text-[33px] text-center font-semibold ">
//               Login to Account!
//             </h1>
//             <p className="text-hash text-center lg:text-lg">
//               Please enter your email and password to continue.
//             </p>
//           </div>
//           <Form
//             name="normal_login"
//             layout="vertical"
//             initialValues={{
//               remember: false,
//             }}
//             onFinish={onFinish}
//             requiredMark={false}
//             className="text-start"
//           >
//             <Form.Item
//               label={<span className="font-medium text-base">Email</span>}
//               name="email"
//               rules={[
//                 {
//                   type: "email",
//                   message: "Please input a valid Email!",
//                 },
//                 {
//                   required: true,
//                   message: "Please input your Email!",
//                 },
//               ]}
//             >
//               <Input size="large" placeholder="admin@gmail.com" />
//             </Form.Item>
//             <Form.Item
//               label={<span className="font-medium text-base">Password</span>}
//               className="mt-6"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your password!",
//                 },
//               ]}
//             >
//               <Input.Password size="large" placeholder="**********" />
//             </Form.Item>
//             <div className="flex justify-between items-center">
//               <Form.Item name="remember" valuePropName="checked">
//                 <Checkbox className="text-base font-medium">
//                   Remember me
//                 </Checkbox>
//               </Form.Item>
//               <Form.Item>
//                 <Button
//                   onClick={() => navigate("/auth/forgot-password")}
//                   type="link"
//                   className="text-base font-medium text-info"
//                 >
//                   Forget password?
//                 </Button>
//               </Form.Item>
//             </div>
//             <div className="w-full flex justify-center ">
//               <Button
//                 type="primary"
//                 size="large"
//                 htmlType="submit"
//                 className="px-2 w-full bg-playground"
//               >
//                 Sign In
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// import { Input, Button,  } from "antd";
// import {
//   MailOutlined,
//   LockOutlined,
//   EyeInvisibleOutlined,
//   EyeTwoTone,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../redux/features/authSlice";
// export default function SignIn() {
//   const navigate = useNavigate();
//   const [login]  = useLoginMutation()

//   return (
//     <div className="flex h-screen ">
//       {/* Background Image Section */}
//       <div
//         className="w-full bg-cover bg-center flex justify-center items-center bg-gradient-to-b from-blue-200 to-blue-100"
//         style={{
//           backgroundImage: "url('/login.png')", // Replace with your actual image path
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* Sign-In Form Section */}
//         <div className="w-3/5  ">
//           <div
//             // style={{
//             //   background:
//             //     "linear-gradient(180deg, ##409cfe 100%, ##75b5df 43%)",
//             // }}
//             className=" shadow-lg bg-gradient-to-t to-[#409cfe]  from-[#75b5df] rounded-lg px-8 py-10 w-96"
//           >
//             {/* Form */}
//             <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
//               Sign In
//             </h1>
//             <div className="mb-4">
//               <Input
//                 size="large"
//                 placeholder="Enter Your Email"
//                 prefix={<MailOutlined />}
//                 className="rounded-full"
//               />
//             </div>
//             <div className="mb-4 ">
//               <Input.Password
//                 size="large"
//                 placeholder="Enter Password"
//                 prefix={<LockOutlined />}
//                 iconRender={(visible) =>
//                   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                 }
//                 className="rounded-full"
//               />
//             </div>

//             {/* Remember Me and Forgot Password */}
//             <div className="text-end">
//               <div>
//                 <button
//                   onClick={() => navigate("/auth/forgot-password")}
//                   type="link"
//                   className="text-white text-end hover:text-black  text-xs pb-3"
//                 >
//                   Forget password?
//                 </button>
//               </div>
//             </div>

//             <div className="w-full flex justify-center ">
//               <Button
//                 type="solid"
//                 size="large"
//                 htmlType="submit"
//                 className="px-2 w-full text-white bg-playground"
//               >
//                 Sign In
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Input, Button, message, Spin } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../redux/features/authSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return message.error("Email and Password are required!");
    }

    try {
      const response = await login({ email, password }).unwrap();

      if (response?.success) {
        const { accessToken, admin } = response.data;
        console.log(response)

        if (admin) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("admin", JSON.stringify(admin));
          // dispatch(
          //   setUser({
          //     user: admin,
          //     token: accessToken,
          //   })
          // );
          message.success("Login Successful!");
          navigate(location.state ? location.state : "/"); // Redirect
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "You are not authorized.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: response?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text:
          error?.data?.message || "Something went wrong. Please try again.",
      });
    }
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
        {/* Sign-In Form Section */}
        <div className="w-3/5">
          <div className="shadow-lg bg-gradient-to-t to-[#409cfe] from-[#75b5df] rounded-lg px-8 py-10 w-96">
            <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
              Sign In
            </h1>

            <div className="mb-4">
              <Input
                size="large"
                placeholder="Enter Your Email"
                prefix={<MailOutlined />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full"
              />
            </div>

            <div className="mb-4">
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
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="text-end">
              <button
                onClick={() => navigate("/auth/forgot-password")}
                className="text-white text-xs hover:text-black pb-3"
              >
                Forget password?
              </button>
            </div>

            <div className="w-full flex justify-center">
              <Button
                type="primary"
                size="large"
                onClick={handleLogin}
                className="px-2 w-full text-white bg-blue-500 hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? <Spin /> : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
