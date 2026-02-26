


import { useState } from "react";
import { Button, Form, message, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useVerifyEmailMutation } from "../../redux/features/authSlice";

const VerifyEmail = () => {
  const navigate = useNavigate();
  // const { id } = useParams();



  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [form] = Form.useForm();


  const onFinish = async () => {
    if (!/^\d{6}$/.test(otp)) {
      return Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please enter a valid 6-digit OTP number!",
      });
    }

    try {
      const response = await verifyEmail({ email:email , otp }).unwrap();
      console.log(response)
      

      if (response?.success) {
        localStorage.setItem("accessToken", response?.data?.accessToken);
        console.log(response?.data)
        message.success(response?.message ?? "Email verified successfully!");
        navigate(`/auth/reset-password`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed!",
          text: response?.message || "Invalid OTP. Please try again.",
        });
      }
    } catch (error) {
      console.error("Verification Error:", error);
      Swal.fire({
        icon: "error",
        title: "Verification Failed!",
        text: error?.data?.message || "Something went wrong. Try again.",
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
        {/* Email Verification Form Section */}
        <div className="w-3/5">
          <div className="shadow-lg bg-gradient-to-t to-[#409cfe] from-[#75b5df] rounded-lg px-8 py-10 w-96">
            <h1 className="text-center text-[24px] mb-4 text-[#ffffff]">
              Verify Email
            </h1>
            <p className="text-center mb-4 text-white">
              Please enter the OTP sent to your email.
            </p>

            <Form form={form} name="verify_email" layout="vertical" onFinish={onFinish}>
              <div className="py-3 text-2xl font-semibold flex justify-center">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    height: "50px",
                    width: "50px",
                    margin: "5px",
                    border: "1px solid #61D0FF",
                    outline: "none",
                    borderRadius: "10px",
                    color: "black",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                  renderSeparator={<span> </span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>

              <div className="w-full flex justify-center mt-3">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="px-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <Spin /> : "Verify Email"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
