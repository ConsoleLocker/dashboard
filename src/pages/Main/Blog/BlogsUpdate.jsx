import { useParams, useNavigate } from "react-router-dom";
import { useSingleBlogsQuery, useUpdateBlogsMutation } from "../../../redux/features/blogSlice";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function BlogsUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blogData } = useSingleBlogsQuery(id);
  const [updateBlogs, { isLoading }] = useUpdateBlogsMutation();
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (blogData?.data?.blog) {
      setFormData({
        title: blogData.data.blog.title,
        description: blogData.data.blog.description,
        image: null,
        imagePreview: blogData.data.blog.image,
      });
    }

    return () => {
      if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [blogData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        toast.error("Please select an image file (JPEG, PNG, etc.)");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Clean up previous object URL if exists
      if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagePreview);
      }

      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Blog ID is missing");
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);

      if (formData.image) {
        formDataToSend.append("images", formData.image);
      }

      const result = await updateBlogs({
        id: blogData?.data?.blog?._id,
        body: formDataToSend,
      }).unwrap();

      toast.success(result.message || "Blog updated successfully!");
      navigate("/blog");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update blog");
      console.error("Error details:", err);
    }
  };

  // Determine the correct image source
  const getImageSrc = () => {
    if (formData.imagePreview) {
      // If it's a blob URL (newly selected image)
      if (formData.imagePreview.startsWith('blob:')) {
        return formData.imagePreview;
      }
      // If it's the existing image from server
      return `${IMAGE}${formData.imagePreview}`;
    }
    return '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Update Blog</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter blog description"
            required
          />
        </div>

        {/* Image Upload Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Blog Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />

          {formData.imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
              <img
                src={getImageSrc()}
                alt="Blog preview"
                className="max-h-40 rounded-md object-cover"
                onLoad={() => {
                  if (formData.imagePreview.startsWith('blob:')) {
                    URL.revokeObjectURL(formData.imagePreview);
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Blog"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}