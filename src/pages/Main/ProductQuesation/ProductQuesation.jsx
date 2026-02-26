// import { useState } from "react";
// import { Card, Button, Pagination, List } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import toast from "react-hot-toast";
// import { useSellProductGetQuery } from "../../../redux/features/sellProductSlice";

// // const products = [
// //   {
// //     id: 1,
// //     name: "Xbox",
// //     price: "$452",
// //     image: "/projects.png",
// //   },
// //   {
// //     id: 2,
// //     name: "Xbox",
// //     price: "$452",
// //     image: "/projects.png",
// //   },
// //   {
// //     id: 3,
// //     name: "Xbox",
// //     price: "$452",
// //     image: "/projects.png",
// //   },
// //   {
// //     id: 4,
// //     name: "Xbox",
// //     price: "$452",
// //     image: "/projects.png",
// //   },
// //   {
// //     id: 5,
// //     name: "Xbox",
// //     price: "$452",
// //     image: "/projects.png",
// //   },
// //   {
// //     id: 6,
// //     name: "Xbox",
// //     price: "$452",
// //     image: "/projects.png",
// //   },
// // ];

// export default function ProductQuesation() {
//   const [page, setPage] = useState(1);
//   const pageSize = 6;

//   const {data:products} = useSellProductGetQuery()
//   // console.log(data?.data?.products)

//   return (
//     <div className="p-6">
//       <div className="flex justify-between  items-center mb-4 container mx-auto">

//         <div className="flex items-center gap-2">
//           <Link to={'/'}>
//             <Button
//               type="link"
//               icon={
//                 <span className="material-icons">
//                   <ArrowLeft />
//                 </span>
//               }
//               className="text-black text-lg"
//             />
//           </Link>
//           <h2 className="text-3xl font-semibold">Estimete your Product Price</h2>
//         </div>

//         <Link to={'/productForm'} className="flex gap-2 items-center cursor-pointer">
//           <button className="bg-[#101010] px-6 py-3 rounded-lg  font-normal text-white">
//           Add New Product
//           </button>
//         </Link>
//       </div>

//       <List className="border-2 p-4 rounded-lg"
//         dataSource={products}
//         renderItem={(product) => (
//           <Card className="mb-4 shadow-sm border-2">
//             <div className="flex items-center">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-[120px] h-[120px] rounded-lg object-cover"
//               />
//               <div className="ml-4 flex-1 space-y-4">
//                 <h3 className="text-[24px] font-semibold">{product.name}</h3>
//                 <p className="text-gray-600 text-lg font-medium">Price: {product.price}</p>
//               </div>
//               <div className="flex gap-2">
//                 <Button type="text" className="bg-rose-100 p-3 rounded-full" onClick={()=> toast.success('Successfully toasted!')} danger icon={<DeleteOutlined />} />
//                 {/* <Button type="text" className="bg-blue-100 rounded-full p-3"  icon={<EditOutlined />} /> */}
//                 <Link to={'/editProducts'}>
//                   <Button type="text" className="bg-green-100 rounded-full p-3" icon={<EditOutlined />} />
//                 </Link>

//               </div>
//             </div>
//           </Card>
//         )}
//       />

//       <div className="flex justify-center mt-6">
//         <Pagination
//           current={page}
//           total={12 * pageSize}
//           pageSize={pageSize}
//           onChange={(p) => setPage(p)}
//           showSizeChanger={false}
//         />
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Card, Button, Pagination, List, Spin } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import toast from "react-hot-toast";
// import { useSellProductGetQuery } from "../../../redux/features/sellProductSlice";
// import { useProductQuestionDeleteMutation } from "../../../redux/features/productQuestionSlice";

// export default function ProductQuesation() {
//   const [page, setPage] = useState(1);
//   const pageSize = 6;

//   const { data, isLoading, isError } = useSellProductGetQuery();
//   const products = data?.data?.products || [];
//   console.log(products);
//   const [productQuestionDelete] = useProductQuestionDeleteMutation();

//   const IMAGE = import.meta.env.VITE_IMAGE_API;
//   console.log(IMAGE, "image apiS");

//   if (isLoading) {
//     return (
//       <Spin
//         size="large"
//         className="flex justify-center items-center h-screen"
//       />
//     );
//   }

//   if (isError) {
//     return <div>Error fetching products</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4 container mx-auto">
//         <div className="flex items-center gap-2">
//           <Link to={"/"}>
//             <Button
//               type="link"
//               icon={
//                 <span className="material-icons">
//                   <ArrowLeft />
//                 </span>
//               }
//               className="text-black text-lg"
//             />
//           </Link>
//           <h2 className="text-3xl font-semibold">
//             Estimate your Product Price
//           </h2>
//         </div>

//         <Link
//           to={"/productForm"}
//           className="flex gap-2 items-center cursor-pointer"
//         >
//           <button className="bg-[#101010] px-6 py-3 rounded-lg font-normal text-white">
//             Add New Product
//           </button>
//         </Link>
//       </div>

//       <List
//         className="border-2 p-4 rounded-lg"
//         dataSource={products}
//         renderItem={(product) => (
//           <Card className="mb-4 shadow-sm border-2">
//             <div className="flex items-center">
//               <img
//                 src={`${IMAGE}${product.image}`}
//                 alt={product.name}
//                 className="w-[120px] h-[120px] rounded-lg object-cover"
//               />
//               <div className="ml-4 flex-1 space-y-4">
//                 <h3 className="text-[24px] font-semibold">{product.name}</h3>
//                 <p className="text-gray-600 text-lg font-medium">
//                   Price: ${product.base_price}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   type="text"
//                   className="bg-rose-100 p-3 rounded-full"
//                   onClick={() => toast.success("Successfully toasted!")}
//                   danger
//                   icon={<DeleteOutlined />}
//                 />
//                 <Link to={"/editProducts"}>
//                   <Button
//                     type="text"
//                     className="bg-green-100 rounded-full p-3"
//                     icon={<EditOutlined />}
//                   />
//                 </Link>
//               </div>
//             </div>
//           </Card>
//         )}
//       />

//       <div className="flex justify-center mt-6">
//         <Pagination
//           current={page}
//           total={data?.data?.meta?.total || 0}
//           pageSize={pageSize}
//           onChange={(p) => setPage(p)}
//           showSizeChanger={false}
//         />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Card, Button, Pagination, List, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  useProductQuestionDeleteMutation,
  useSellProductGetQuery,
} from "../../../redux/features/productQuestionSlice";

export default function ProductQuesation() {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { data, isLoading, isError, refetch } = useSellProductGetQuery({ limit: 100 });
  const products = data?.data?.products || [];
  const [productQuestionDelete] = useProductQuestionDeleteMutation();

  const IMAGE = import.meta.env.VITE_IMAGE_API;
  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMAGE}${imagePath}`;
  };

  const handleDelete = async (_id) => {
    console.log(_id, "id to delete");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await productQuestionDelete(_id).unwrap();
          Swal.fire(
            "Deleted!",
            "Product buy question has been deleted successfully!",
            "success"
          );
          refetch();
        } catch (error) {
          toast.error("Failed to delete the product question");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 container mx-auto">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <Button
              type="link"
              icon={
                <span className="material-icons">
                  <ArrowLeft />
                </span>
              }
              className="text-black text-lg"
            />
          </Link>
          <h2 className="text-3xl font-semibold">
            Estimate your Product Price
          </h2>
        </div>

        <Link
          to={"/productForm"}
          className="flex gap-2 items-center cursor-pointer"
        >
          <button className="bg-[#101010] px-6 py-3 rounded-lg font-normal text-white">
            Add New Product
          </button>
        </Link>
      </div>

      <List
        className="border-2 p-4 rounded-lg"
        dataSource={products}
        renderItem={(product) => (
          <Card className="mb-4 shadow-sm border-2">
            <div className="flex items-center">
              <img
                src={getImageSrc(product.image)}
                alt={product.name}
                className="w-[120px] h-[120px] rounded-lg object-cover"
              />
              <div className="ml-4 flex-1 space-y-4">
                <h3 className="text-[24px] font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-lg font-medium">
                  Price: ${product.base_price}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="text"
                  className="bg-rose-100 p-3 rounded-full"
                  onClick={() => handleDelete(product._id)}
                  danger
                  icon={<DeleteOutlined />}
                />
                <Link to={`/editProducts/${product._id}`}>

                  <Button
                    type="text"
                    className="bg-green-100 rounded-full p-3"
                    icon={<EditOutlined />}
                  />
                </Link>
              </div>
            </div>
          </Card>
        )}
      />

      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          total={data?.data?.meta?.total || 0}
          pageSize={pageSize}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
