import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";


const PhoneCountryInput = ({ disabled }) => {
  const [phoneNumber, setPhoneNumber] = useState("+1 4575454545");
  // console.log(phoneNumber);


   const storedData = localStorage.getItem("admin");
    const adminData = storedData ? JSON.parse(storedData) : null;
  
    const profileData = {
      name: adminData?.name || "Jane Kooper",
      email: adminData?.email || "enrique@gmail.com",
      phone: adminData?.phone || "+880 1550597212",
      profile: adminData?.avatar ,
      
    };

  return (
    <PhoneInput
      disabled={disabled}
      className="custom-phone "
      placeholder="Enter phone number"
      international
      countryCallingCodeEditable={false}
      // style={{
      //   marginTop: "1px",
      // }}
      defaultCountry="RU"
      value={profileData?.phone || phoneNumber?.toString()}
      onChange={setPhoneNumber}
    />
    // <Input.Group compact style={{ display: 'flex', alignItems: 'center' }}>
    //   {/* Flag and Country Code */}
    //   <Select
    //     disabled={disabled}
    //     defaultValue={countryCode}
    //     onChange={handleCountryChange}
    //     style={{ width: '120px', marginRight: '8px' }}
    //   >
    //     <Select.Option value="US">
    //       <FlagIcon code="US" style={{ width: '20px', height: '14px', marginRight: '8px' }} />
    //       +1
    //     </Select.Option>
    //     <Select.Option value="RU">
    //       <FlagIcon code="RU" style={{ width: '20px', height: '14px', marginRight: '8px' }} />
    //       +7
    //     </Select.Option>
    //     {/* Add more countries and flags here */}
    //   </Select>

    //   {/* Phone Number Input */}
    //   <Input
    //     disabled={disabled}
    //     placeholder="Enter phone number"
    //     value={phoneNumber}
    //     onChange={(e) => setPhoneNumber(e.target.value)}
    //     style={{ width: 'calc(100% - 130px)' }}
    //   />
    // </Input.Group>
  );
};

export default PhoneCountryInput;
