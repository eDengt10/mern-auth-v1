//* ====== Imports of BuiltIn Components ====== *//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//* ====== Imports of Pages ====== *//
import { Home, Profile } from "./pages/imports";
import { SignIn, SignUp } from "./components/imports";
import EditProfile from "./components/Profile/EditProfile";
import AdminSignIn from "./components/Admin/AdminSignIn";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import AddUser from "./components/Admin/Dashboard/AddUser";
import EditUser from "./components/Admin/Dashboard/EditUser";


//* ====== Main App Component ====== *//
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/home" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/edit-profile" element={<EditProfile />} />

				{/* ADMIN SIDE */}
				<Route path="/admin/signin" element={<AdminSignIn />} />
				<Route path="/admin/home" element={<AdminHomePage />} />
				<Route path="/admin/dashboard" element={<Dashboard />} />
				<Route path="/admin/edit-user" element={<EditUser />} />
				<Route path="/admin/add-user" element={<AddUser />} />
			</Routes>
		</Router>
	);
}

export default App;
