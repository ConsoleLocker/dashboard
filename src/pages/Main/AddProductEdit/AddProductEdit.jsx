/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Input, Button, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useEditProductMutation,
  useProductByNameQuery,
  useUpdateProductLabelMutation,
} from "../../../redux/features/productsSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { getBackgroundColor } from "../../../lib/productTypeColor";
import Specification from "../../../Components/Specification";

const { TextArea } = Input;

const AddProductEditComponent = ({ product, refetch, isFirst }) => {
  const [editProduct] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMAGE}${imagePath}`;
  };

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(product?.images?.length);
  const [formData, setFormData] = useState(product);

  const handleUpload = ({ file }) => {
    setImage(file.originFileObj || file);
    setOldImage(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value ?? "" });
  };

  const handleSave = async () => {
    const toastId = toast.loading("Updating product...");
    try {
      if (!formData.product_type.trim()) {
        toast.error("Product type is required", { id: toastId });
        return;
      }

      if (!formData.price || isNaN(Number(formData.price))) {
        toast.error("Price must be a valid number", { id: toastId });
        return;
      }

      if (!formData.offer_price || isNaN(Number(formData.offer_price))) {
        toast.error("Offer price must be a valid number", { id: toastId });
        return;
      }

      if (!formData.controller.trim()) {
        toast.error("Controller is required", { id: toastId });
        return;
      }

      if (!formData.quantity || isNaN(Number(formData.quantity))) {
        toast.error("Quantity must be a valid number", { id: toastId });
        return;
      }

      if (!oldImage && !image) {
        toast.error("An image is required", { id: toastId });
        return;
      }

      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", Number(formData.price));
      productData.append("offer_price", Number(formData.offer_price));
      productData.append("brand", formData.brand);
      productData.append("model", formData.model);
      productData.append("condition", formData.condition);
      productData.append("controller", formData.controller);
      productData.append("memory", formData.memory);
      productData.append("quantity", Number(formData.quantity));
      productData.append("product_type", formData.product_type.trim());
      productData.append("slug", formData.slug.trim());
      image && productData.append("images", image);

      productData.append("modelDes", formData.modelDes);
      productData.append("conditionDes", formData.conditionDes);
      productData.append("controllerDes", formData.controllerDes);
      productData.append("memoryDes", formData.memoryDes);
      productData.append("caption", formData.caption);

      if (!product.slug) {
        console.error("Product slug is missing, cannot update.");
        toast.error("System Error: Product slug is missing.", { id: toastId });
        return;
      }

      await editProduct({
        slug: product.slug,
        formData: productData,
      }).unwrap();

      toast.success("Product updated successfully", { id: toastId });
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update product. Please try again.", {
        id: toastId,
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteProduct(productId).unwrap();

        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
        });
        await refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the product.",
        icon: "error",
      });
      console.error("Error deleting product:", error);
    }
  };

  const getBackgroundColor = () => {
    switch (product?.product_type) {
      case "xbox":
        return "bg-[#63B95D]";
      case "playstation":
        return "bg-[#1761BF]";
      case "nintendo":
        return "bg-[#F34040]";
      default:
        return "bg-white";
    }
  };

  return (
    <div
      className={`container mx-auto p-6 my-0 ${getBackgroundColor()} shadow-md rounded-md`}>
      <div className="gap-6">
        <div className="flex gap-4 mb-4">
          <div className="flex gap-10 h-fit bg-white rounded-lg p-2">
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleUpload}>
              {oldImage ? (
                <img src={getImageSrc(product?.images?.[0])} />
              ) : (
                !image && (
                  <div className="text-center">
                    <UploadOutlined className="text-2xl mb-2" />
                    <Typography.Text>Upload Image</Typography.Text>
                  </div>
                )
              )}
            </Upload>
          </div>
          <div className="flex-grow">
            <label className="block text-lg font-medium -mt-1 mb-1">
              Description
            </label>
            <TextArea
              name="description"
              className="w-full"
              rows={8}
              placeholder="Product Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={`col-span-2 border p-4 rounded-lg`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                Model Name
              </label>
              <Input
                name="model"
                placeholder="Model Name"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Condition
              </label>
              <Input
                name="condition"
                placeholder="Condition"
                type="text"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Controller
              </label>
              <Input
                name="controller"
                placeholder="Controller"
                type="text"
                value={formData.controller}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Memory</label>
              <Input
                name="memory"
                placeholder="Memory"
                type="text"
                value={formData.memory}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Regular Price (€)
              </label>
              <Input
                name="price"
                placeholder="Regular Price (€)"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Offer Price (€)
              </label>
              <Input
                name="offer_price"
                placeholder="Offer Price (€)"
                type="number"
                value={formData.offer_price}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Available Products
              </label>
              <Input
                name="quantity"
                placeholder="Available Products"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">Slug</label>
            <Input
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full h-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 my-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                Model description
              </label>
              <Input
                name="modelDes"
                value={formData.modelDes}
                placeholder="Model placeholder description"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Controller description
              </label>
              <Input
                name="controllerDes"
                value={formData.controllerDes}
                placeholder="Controller placeholder description"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Memory description
              </label>
              <Input
                name="memoryDes"
                value={formData.memoryDes}
                placeholder="Memory placeholder description"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Condition description
              </label>
              <Input
                name="conditionDes"
                value={formData.conditionDes}
                placeholder="Condition placeholder description"
                onChange={handleInputChange}
              />
            </div>

            {/* Card Caption: visibile solo sulla prima card */}
            {isFirst && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Card Caption
                </label>
                <Input
                  name="caption"
                  value={formData.caption}
                  placeholder="Card caption"
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="primary"
              onClick={handleSave}
              className="bg-black text-white py-3">
              Save Product
            </Button>
            {product?._id && (
              <Button
                type="error"
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-rose-500 text-white py-3">
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AddProductEdit = () => {
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [updateLabel] = useUpdateProductLabelMutation();
  const navigate = useNavigate();

  const params = useParams();

  const [name, setName] = useState(params.name);

  const { data, refetch } = useProductByNameQuery({
    name,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (data?.data) {
      if (data?.data?.length === 0) {
        navigate(-1);
      } else {
        setProducts(data?.data);
        setProductType(data?.data[0]?.product_type);
      }
    }
  }, [data, navigate]);

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-10 p-4 bg-white">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate(-1)}
              type="link"
              icon={<ArrowLeft />}
              className="text-black text-lg"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{products[0]?.name}</h3>
              <p>{products[0]?.brand}</p>
            </div>
          </div>
          <div>
            <Specification product={products[0]} />
          </div>
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const product_type = e.target.product_type.value;

          if (!product_type) toast.error("Please select a product type");

          const data = {
            modelLabel: e.target.modelLabel.value,
            controllerLabel: e.target.controllerLabel.value,
            memoryLabel: e.target.memoryLabel.value,
            conditionLabel: e.target.conditionLabel.value,
            name: e.target.name.value,
            brand: e.target.brand.value,
            product_type,
          };

          const toastId = toast.loading("Updating labels...");

          try {
            await updateLabel({
              name,
              data,
            }).unwrap();
            toast.success("Labels updated successfully", { id: toastId });
          } catch {
            toast.error("Failed to update labels", { id: toastId });
          } finally {
            history.pushState(
              {},
              "",
              `/addEditProducts/${e.target.name.value}`,
            );

            setName(e.target.name.value);
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 my-2 bg-white p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            name="name"
            defaultValue={products[0]?.name}
            className="w-full border px-2 py-1 rounded-sm"
            placeholder="product name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            name="brand"
            defaultValue={products[0]?.brand}
            className="w-full border px-2 py-1 rounded-sm"
            placeholder="Product brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Model label</label>
          <input
            name="modelLabel"
            defaultValue={products[0]?.modelLabel}
            className="w-full border px-2 py-1 rounded-sm"
            placeholder="Model placeholder label"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Controller label
          </label>
          <input
            name="controllerLabel"
            defaultValue={products[0]?.controllerLabel}
            className="w-full border px-2 py-1 rounded-sm"
            placeholder="Controller placeholder label"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Memory label</label>
          <input
            name="memoryLabel"
            defaultValue={products[0]?.memoryLabel}
            className="w-full border px-2 py-1 rounded-sm"
            placeholder="Memory placeholder label"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Condition label
          </label>
          <input
            name="conditionLabel"
            defaultValue={products[0]?.conditionLabel}
            className="w-full border px-2 py-1 rounded-sm"
            placeholder="Condition placeholder label"
          />
        </div>
        <div className="flex gap-2 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product type
            </label>
            <select
              name="product_type"
              value={productType}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setProductType(selectedValue);
                const bgColor = getBackgroundColor(selectedValue);
                e.target.style.backgroundColor = bgColor;
              }}
              className={`border rounded-md px-2 py-2 inline-block h-full bg-[${getBackgroundColor(
                productType,
              )}] text-white`}>
              <option value="" disabled hidden>
                Select Type
              </option>
              {[
                { value: "xbox", label: "Xbox" },
                { value: "playstation", label: "PlayStation" },
                { value: "nintendo", label: "Nintendo" },
              ].map(({ label, value }, idx) => (
                <option key={idx} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-sky-500 text-white rounded-md click">
            Save
          </button>
        </div>
      </form>
      {products.map((product, index) => (
        <AddProductEditComponent
          key={product?._id}
          product={product}
          refetch={refetch}
          isFirst={index === 0}
        />
      ))}
      <Button
        type="primary"
        disabled={!products.at(-1)?._id}
        onClick={() => {
          setProducts([
            ...products,
            {
              images: undefined,
              name: products.at(-1)?.name,
              description: "",
              price: undefined,
              offer_price: undefined,
              brand: products.at(-1)?.brand,
              model: "",
              condition: "",
              controller: "",
              memory: "",
              quantity: undefined,
              isVariant: false,
              product_type: products.at(-1)?.product_type,
              slug: products.at(-1)?.slug + "-" + Date.now(),
              modelDes: "",
              conditionDes: "",
              controllerDes: "",
              memoryDes: "",
            },
          ]);
        }}
        className="w-fit p-6">
        Add Variant
      </Button>
    </div>
  );
};

export default AddProductEdit;
