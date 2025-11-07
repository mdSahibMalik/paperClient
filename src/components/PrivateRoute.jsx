import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ requiredRoles = [] }) => {
  const token = localStorage.getItem("token");

  // Determine which login page to redirect to (based on requiredRoles)
  let redirectPath = "/login"; // default for normal users
  if (requiredRoles.includes("college")) redirectPath = "/college-login";
  if (requiredRoles.includes("admin")) redirectPath = "/admin-dashboard-login";

  // If no token → redirect to appropriate login page
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check for expired token
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to={redirectPath} replace />;
    }

    // Check role-based access
    if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
      // Unauthorized — redirect to correct login page
      return <Navigate to={redirectPath} replace />;
    }

    // ✅ All checks passed — allow access
    return <Outlet />;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to={redirectPath} replace />;
  }
};

export default PrivateRoute;



// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode"; // ✅ correct import

// const PrivateRoute = ({ requiredRole }) => {
//   const token = localStorage.getItem("token");

//   // If no token → redirect to login/home
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     const decoded = jwtDecode(token);   

//     // (Optional) Check token expiry if your JWT includes `exp`
//     const currentTime = Date.now() / 1000;

//     if (decoded.exp && decoded.exp < currentTime) {
//       localStorage.removeItem("token"); // clear expired token
//       return <Navigate to="/login" replace />;
//     }

//     // (Optional) Check role-based access for user
//     if (requiredRole && decoded.role !== requiredRole) {
//       return <Navigate to="/login" replace />;
//     }
//     // (Optional) Check role-based access for college
//     if (requiredRole && decoded.role !== requiredRole) {
//       return <Navigate to="/college-login" replace />;
//     }
//     // (Optional) Check role-based access for college
//     if (requiredRole && decoded.role !== requiredRole) {
//       return <Navigate to="/admin-dashboard-college-login" replace />;
//     }

//     // ✅ Token exists and is valid
//     return <Outlet />;
//   } catch (error) {
//     console.error("Invalid token:", error);
//     localStorage.removeItem("token");
//     return <Navigate to="/" replace />;
//   }
// };

// export default PrivateRoute;
