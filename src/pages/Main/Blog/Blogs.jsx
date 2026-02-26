import { useState } from "react";
import { User, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  useDeleteBlogsMutation,
  useGetAllBlogsQuery,
} from "../../../redux/features/blogSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function Blogs() {
  const { data, isLoading, isError, refetch } = useGetAllBlogsQuery();
  const blogs = data?.data?.blogs || []; // Use API data if available

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMAGE}${imagePath}`;
  };

  const [deleteBlogs] = useDeleteBlogsMutation();

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load blogs</p>;

  // const handleDelete = async (_id) => {
  //   console.log(_id, "id to delete");
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await deleteBlogs().unwrap();
  //         Swal.fire(
  //           "Deleted!",
  //           "Product buy question has been deleted successfully!",
  //           "success"
  //         );
  //         refetch();
  //       } catch (error) {
  //         toast.error("Failed to delete the product question");
  //       }
  //     }
  //   });
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button
              type="link"
              icon={<ArrowLeft />}
              className="text-black text-lg"
            />
          </Link>
          <h2 className="text-3xl font-semibold">Blog Posts</h2>
        </div>
        <Link to="/addBlog">
          <button className="bg-[#101010] px-6 py-3 rounded-lg text-white font-normal">
            Add Blog
          </button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {currentBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            {/* <img
              src={
                blog.image.startsWith("/")
                  ? `https://your-api-url.com${blog.image}`
                  : blog.image
              }
              alt={blog.title}
              className="rounded-lg mb-4 object-cover"
            /> */}
            <img
              src={getImageSrc(blog?.image)}
              alt={blog.title}
              className="rounded-lg mb-4 object-cover h-[200px]"
            />

            <div className="flex items-center justify-between text-sm text-gray-600 gap-6 mb-4">
              <span className="flex items-center  gap-2">
                <User className="w-4 h-4" />
                {"Admin"}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
            <div className="flex items-center justify-between">
              <Link
                to={`/blogsDetails/${blog.slug}`}
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                Read More
              </Link>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        await deleteBlogs(blog._id);
                        Swal.fire("Deleted!", "Blog has been deleted.", "success");
                        refetch();
                      } catch (error) {
                        toast.error("Failed to delete the blog");
                      }
                    }
                  });
                }}
                className="text-red-600 font-semibold text-sm bg-red px-6 py-2 rounded-lg"
              >
                delete
              </button>
              <Link
                to={`/editBlog/${blog.slug}`}
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                update
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md ${currentPage === page
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
