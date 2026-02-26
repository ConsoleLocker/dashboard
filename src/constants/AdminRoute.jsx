// /* eslint-disable react/prop-types */

// import { Navigate, useLocation } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { TailSpin } from "react-loader-spinner";
// const AdminRoutes = ({ children }) => {
//   const location = useLocation();
//   const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage
//   console.log()
//   let user = '';

//   try {
//     if (token) {
//       user = jwtDecode(token); // Decode the token
//       console.log(user)
//     }
//   } catch (error) {
//     console.error("Invalid token:", error.message);
//   }

//   if (!user) {
//     // Redirect to login if no token is available
//     return <Navigate state={{ from: location }} to="/auth" replace />;
//   }

//   if (user.role !== "ADMIN") {
//     // Redirect to login if the user is not an admin
//     return <Navigate state={{ from: location }} to="/" replace />;
//   }

//   // Show a loader if decoding or validation takes time (can be removed if unnecessary)
//   if (!user) {
//     return (
//       <div className="h-screen w-full flex flex-col justify-center items-center">
//         <TailSpin
//           visible={true}
//           height="70"
//           width="70"
//           color="#4fa94d"
//           ariaLabel="tail-spin-loading"
//         />
//         <p className="mt-5 font-mono text-gray-500 text-center">
//           Please Wait <br /> Validating...
//         </p>
//       </div>
//     );
//   }

//   // Render children if the user is an admin
//   return children;
// };

// export default AdminRoutes;

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("Decoded User:", decodedUser);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error.message);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-gray-600 font-semibold">Validating access...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!user.adminId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoutes;
