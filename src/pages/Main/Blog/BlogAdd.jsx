// import  { useState } from "react";
// import { Button, Input, Upload, Typography, Card } from "antd";
// import {  UploadOutlined } from "@ant-design/icons";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import { usePostBlogMutation } from "../../../redux/features/blogSlice";

// const { TextArea } = Input;

// export default function AddBlog() {
//   const [postBlog]= usePostBlogMutation()
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   const handleUpload = ({ file }) => {
//     setImage(file);
//   };

//   const handleSave = () => {
//     console.log("Blog Saved:", { title, description, image });
//     // Add your save logic here
//   };

//   return (
//     <div className="container mx-auto px-4 py-8  min-h-screen">
//       {/* Header */}
//       <Link to={'/blog'}>
//         <button className="mb-6 flex items-center  gap-2">
//           <ArrowLeft className="size-10" />
//           <h1 className=" text-[32px] font-medium">Add Blog</h1>
//         </button>
//       </Link>

//       {/* Form Card */}
//       <Card className="shadow-lg rounded-lg p-6">
//         <div className="">
//           {/* Image Upload */}
//           <div className="w-1/3 flex flex-col items-center border border-dashed border-gray-300 rounded-lg p-4">
//             <Upload
//               listType="picture-card"
//               maxCount={1}
//               onChange={handleUpload}
//               className="w-full"
//             >
//               {!image && (
//                 <div className="text-center ">
//                   <UploadOutlined className="text-2xl mb-2" />
//                   <Typography.Text className="h-[400px]">
//                     Upload Image
//                   </Typography.Text>
//                 </div>
//               )}
//             </Upload>
//             <Typography.Text className="mt-4 text-gray-500 text-center">
//               Blog Title Name
//             </Typography.Text>
//             <Typography.Text className="text-gray-400 text-center">
//               Product Description
//             </Typography.Text>
//           </div>

//           {/* Input Fields */}
//           <div className="border p-8 mt-6 rounded-lg">
//             <div className="mb-4">
//               <Typography.Text className="block mb-2 font-medium  text-[16px] ">
//                 Blog Title
//               </Typography.Text>
//               <Input
//                 placeholder="Enter a name"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="rounded-lg"
//               />
//             </div>
//             <div>
//               <Typography.Text className="block mb-2 font-medium  text-[16px]">
//                 Blog Description
//               </Typography.Text>
//               <TextArea
//                 rows={10}
//                 placeholder="Enter a description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="rounded-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-end mt-8">
//           <Button
//             // type="primary"
//             size="large"
//             className="bg-[#101010] px-12 text-white hover:"
//             onClick={handleSave}
//           >
//             Save Blog
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }


import { useState } from "react";
import { Button, Input, Upload, Typography, Card, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePostBlogMutation } from "../../../redux/features/blogSlice";

const { TextArea } = Input;

export default function AddBlog() {
  const [postBlog] = usePostBlogMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate= useNavigate()

  const handleUpload = ({ file }) => {
    setImage(file);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("images", image); // Corrected key to "image"
    }

    try {
      const response = await postBlog(formData).unwrap();
      message.success(response.message);
      navigate('/blog'); 
      // Optionally, you can reset the form here
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      message.error("Failed to save the blog.");
      console.error("Error saving blog:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <Link to={'/blog'}>
        <button className="mb-6 flex items-center gap-2">
          <ArrowLeft className="size-10" />
          <h1 className="text-[32px] font-medium">Add Blog</h1>
        </button>
      </Link>

      {/* Form Card */}
      <Card className="shadow-lg rounded-lg p-6">
        <div className="">
          {/* Image Upload */}
          <div className="w-1/3 flex flex-col items-center border border-dashed border-gray-300 rounded-lg p-4">
            <Upload
              listType="picture-card"
              maxCount={1}
              onChange={handleUpload}
              beforeUpload={() => false}
              className="w-full"
            >
              {!image && (
                <div className="text-center">
                  <UploadOutlined className="text-2xl mb-2" />
                  <Typography.Text className="h-[400px]">
                    Upload Image
                  </Typography.Text>
                </div>
              )}
            </Upload>
            <Typography.Text className="mt-4 text-gray-500 text-center">
              Blog Title Name
            </Typography.Text>
            <Typography.Text className="text-gray-400 text-center">
              Product Description
            </Typography.Text>
          </div>

          {/* Input Fields */}
          <div className="border p-8 mt-6 rounded-lg">
            <div className="mb-4">
              <Typography.Text className="block mb-2 font-medium text-[16px]">
                Blog Title
              </Typography.Text>
              <Input
                placeholder="Enter a name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div>
              <Typography.Text className="block mb-2 font-medium text-[16px]">
                Blog Description
              </Typography.Text>
              <TextArea
                rows={10}
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button
            size="large"
            className="bg-[#101010] px-12 text-white hover:"
            onClick={handleSave}
          >
            Save Blog
          </Button>
        </div>
      </Card>
    </div>
  );
}