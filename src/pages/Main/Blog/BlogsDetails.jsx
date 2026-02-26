


import { useState } from "react";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  Share2,
  User,
} from "lucide-react";
import { useSingleBlogsQuery } from "../../../redux/features/blogSlice";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const [copied, setCopied] = useState(false);
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useSingleBlogsQuery(id);
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMAGE}${imagePath}`;
  }

  console.log(blog);
  console.log(blog?.data?.blog?.title)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Occurred! {isError.message}</div>;

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 my-6">
          {blog?.data?.blog?.title}
        </h1>

        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">
          <img
            src={getImageSrc(blog?.data?.blog?.image)}
            alt="Gaming Console"
            className="w-full h-full object-cover"
          />
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
          <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                {/* <img
                  src={"/clients/client1.png"}
                  width={30}
                  height={30}
                  className="w-8 h-8 bg-gray-200 rounded-full"
                  alt="admin"
                /> */}
                <User></User>
                <span>Admin</span>
              </div>
              <time>{blog?.data?.blog?.createdAt?.split("T")[0]}</time>
            </div>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <FacebookIcon size={18} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                <TwitterIcon size={18} />
                <span className="hidden sm:inline">Tweet</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                <LinkedinIcon size={18} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors ml-auto"
              >
                <Share2 size={18} />
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>

            <div className="prose prose-lg max-w-none">
              <p>{blog?.data?.blog?.description}</p>
            </div>
          </article>


        </main>
      </div>
    </div>
  );
}