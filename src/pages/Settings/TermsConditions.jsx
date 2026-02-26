// import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import { FaAngleLeft } from "react-icons/fa6";
// import { useSettingGetQuery } from "../../redux/features/settingSlice";

// const TermsConditions = () => {
//   const navigate = useNavigate();
//   const {data} =useSettingGetQuery()
//   console.log(data?.data)

//   return (
//     <>
//       <div className="flex items-center gap-2 text-xl">
//         <FaAngleLeft />
//         <h1>Terms & Condition</h1>
//       </div>
//       <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
//         <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
//           <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
//             Terms & Condition
//           </h3>
//           <div className="w-full px-16">
            
//             <div className="space-y-5 text-black text-sm">
//               <h1>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspe  ndisse vitae. Tellus interdum enim lorem vel morbi lectus.</h1>
//               <h1>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.</h1>
//               <h1>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspe  ndisse vitae. Tellus interdum enim lorem vel morbi lectus.</h1>
//             </div>
//             <div className="flex justify-end pt-4">
//               <Button
//                 onClick={(e) => navigate(`edit`)}
//                 size="large"
//                 type="primary"
//                 className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
//               >
//                 Edit
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TermsConditions;

import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { useSettingGetQuery } from "../../redux/features/settingSlice";

const TermsConditions = () => {
  const navigate = useNavigate();
  const { data } = useSettingGetQuery();
  
  // Filter the data to get the "Terms & Condition" content
  const termsConditionData = data?.data?.find(item => item.name === "Terms & Condition");

  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <FaAngleLeft onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
        <h1>Terms & Condition</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Terms & Condition
          </h3>
          <div className="w-full px-16">
            <div className="space-y-5 text-black text-sm">
              {/* Render the value of "Terms & Condition" */}
              <p dangerouslySetInnerHTML={{ __html: termsConditionData?.value }}></p>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                onClick={() => navigate("edit")}
                
                size="large"
                type="primary"
                className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
