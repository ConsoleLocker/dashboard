import { CiSettings, CiUser } from "react-icons/ci";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import Notifications from "../pages/Main/Notifications/Notifications";
import { MdOutlineSecurityUpdateWarning, MdReviews } from "react-icons/md";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import Setting from "../pages/Main/Setting/Setting";
import ChangePassword from "../pages/Main/Setting/Change-password/ChangePassword";
import ForgotPassword from "../pages/Main/Setting/Change-password/ForgotPassword";
import VerifyEmail from "../pages/Main/Setting/Change-password/VerifyEmail";
import Trust from "../pages/Settings/Trust";
import EditTrust from "../pages/Settings/EditTrust";
import { IoSettingsOutline } from "react-icons/io5";
import Products from "../pages/Main/Users/Products";
import BuyProducts from "../pages/Main/Earnings/BuyProducts";
import Blogs from "../pages/Main/Blog/Blogs";
import BlogAdd from "../pages/Main/Blog/BlogAdd";
import Transaction from "../pages/Main/DriverRequest/Transaction";
import Orders from "../pages/Main/Orders/Orders";
import AddProducts from "../pages/Main/AddProducts/AddProducts";

import {
	CalendarArrowDown,
	CreditCard,
	Mail,
	Newspaper,
	ShoppingBag,
	TableCellsSplit,
} from "lucide-react";
import NewsletterTemplatesPage from "../pages/Main/Newsletter/NewsletterTemplates";
import ProductQuesation from "../pages/Main/ProductQuesation/ProductQuesation";
import ProductForm from "../pages/Main/ProductForm/ProductForm";
import EditProduct from "../pages/Main/EditProducts/EditProduct";
import AddProductEdit from "../pages/Main/AddProductEdit/AddProductEdit";
import BlogsDetails from "../pages/Main/Blog/BlogsDetails";
import Review from "../pages/Main/Reiview/Review";
import AddReview from "../pages/Main/Reiview/AddReview";
import BlogsUpdate from "../pages/Main/Blog/BlogsUpdate";
import ReviewHome from "../pages/Main/Reiview/ReviewHome";
import ReviewSell from "../pages/Main/Reiview/ReviewSell";
import NotificationDetail from "../pages/Main/Notifications/NotificationDetail";
import Coupons from "../pages/Main/coupon/CouponPage";

export const dashboardItems = [
	{
		name: "Dashboard",
		path: "/",
		icon: RiDashboardHorizontalFill,
		element: <DashboardHome />,
	},
	{
		name: "Products",
		path: "products",
		icon: TableCellsSplit,
		element: <Products />,
	},
	{
		name: "Product Question",
		path: "productQuestion",
		icon: TableCellsSplit,
		element: <ProductQuesation />,
	},
	{
		path: "productForm",
		element: <ProductForm />,
	},
	{
		path: "editProducts/:id",
		element: <EditProduct />,
		loader: ({ params }) =>
			fetch(
				`${import.meta.env.VITE_IMAGE_API}/admin/question/buy/${params.id}`
			),
	},
	{
		path: "addEditProducts/:name",
		element: <AddProductEdit />,
		loader: ({ params }) =>
			fetch(`${import.meta.env.VITE_IMAGE_API}/products/name/${params.name}`),
	},
	{
		path: "review/:name",
		element: <Review />,
		loader: ({ params }) =>
			fetch(`${import.meta.env.VITE_IMAGE_API}/reviews/${params.name}`),
	},
	{
		path: "addreview/:name",
		element: <AddReview />,
		loader: ({ params }) =>
			fetch(
				`${import.meta.env.VITE_IMAGE_API}/admin/reviews/create/${params.name}`
			),
	},
	{
		path: "review/home",
		element: <ReviewHome />,
	},
	{
		path: "review/sell",
		element: <ReviewSell />,
	},
	{
		path: "addProducts",
		element: <AddProducts />,
	},

	{
		path: "notifications",
		element: <Notifications />,
	},
	{
		path: "notifications/:id",
		element: <NotificationDetail />,
	},
	{
		name: "Buy Products",
		path: "buyProducts",
		icon: ShoppingBag,
		element: <BuyProducts />,
	},
	{
		name: "Blog",
		path: "blog",
		icon: Newspaper,
		element: <Blogs />,
	},
	{
		name: "Newsletter",
		path: "newsletter",
		icon: Mail,
		element: <NewsletterTemplatesPage />,
	},
	{
		path: "review",
		icon: MdReviews,
	},
	{
		path: "blogsDetails/:id",
		element: <BlogsDetails />,
		loader: ({ params }) =>
			fetch(`${import.meta.env.VITE_IMAGE_API}/blogs/${params.id}`),
	},
	{
		path: "/addBlog",
		element: <BlogAdd />,
	},
	{
		path: "editBlog/:id",
		element: <BlogsUpdate />,
		loader: ({ params }) =>
			fetch(`${import.meta.env.VITE_IMAGE_API}/blogs/${params.id}`),
	},
	{
		name: "Transaction History",
		path: "transaction",
		icon: CreditCard,
		element: <Transaction />,
	},
	{
		name: "Manage Orders",
		path: "orders",
		icon: CalendarArrowDown,
		element: <Orders />,
	},
	{
		name: "Coupons",
		path: "coupons",
		icon: CalendarArrowDown,
		element: <Coupons />,
	},
	{
		name: "Setting",
		path: "settings",
		icon: IoSettingsOutline,
		element: <Setting />,
	},
	{
		name: "Settings",
		rootPath: "settings",
		icon: CiSettings,
		children: [
			{
				name: "Personal Information",
				path: "settings/profile",
				icon: CiUser,
				element: <MyProfile />,
			},
			{
				path: "settings/profile/edit",
				element: <EditMyProfile />,
			},
			{
				name: "Change Password",
				icon: FaServicestack,
				path: "settings/change-password",
				element: <ChangePassword />,
			},
			{
				path: "settings/change-password/forgot-password",
				element: <ForgotPassword />,
			},
			{
				path: "settings/change-password/forgot-password/verify-email",
				element: <VerifyEmail />,
			},
			{
				name: "Terms & Condition",
				icon: FaServicestack,
				path: "settings/terms-conditions",
				element: <TermsConditions />,
			},
			{
				path: "settings/terms-conditions/edit",
				element: <EditTermsConditions />,
			},
			{
				name: "Privacy Policy",
				icon: MdOutlineSecurityUpdateWarning,
				path: "settings/privacy-policy",
				element: <PrivacyPolicy />,
			},
			{
				path: "settings/privacy-policy/edit",
				element: <EditPrivacyPolicy />,
			},
			{
				name: "Trust & Safety",
				icon: BiMessageSquareDetail,
				path: "settings/trust-safety",
				element: <Trust />,
			},
			{
				path: "settings/trust-safety/edit",
				element: <EditTrust />,
			},
		],
	},
];
