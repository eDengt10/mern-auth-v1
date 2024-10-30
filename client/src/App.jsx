//* ====== Imports of BuiltIn Components ====== *//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//* ====== Imports of Pages ====== *//
import { Home, Profile } from "./pages/imports";
import { SignIn, SignUp } from "./components/imports";
import EditProfile from "./components/Profile/EditProfile";
import AdminSignIn from "./components/Admin/AdminSignIn";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import Dashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AddUser from "./components/Admin/Dashboard/AddUser";
import EditUser from "./components/Admin/Dashboard/EditUser";

import {
	ProtectUserPages,
	ProtectUserAuth,
	InitialPathHandle,
	ProtectAdminPages,
	ProtectAdminAuth,
	AdminInitialPathHandle,
} from "./contexts/ProtectUserRoute";
import EditAdmin from "./components/Admin/Home/EditAdmin";
import ErrorPage from "./pages/ErrorPage";

//* ====== Main App Component ====== *//
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<InitialPathHandle />} />
				<Route
					path="/signin"
					element={
						<ProtectUserAuth>
							<SignIn />
						</ProtectUserAuth>
					}
				/>
				<Route
					path="/signup"
					element={
						<ProtectUserAuth>
							<SignUp />
						</ProtectUserAuth>
					}
				/>
				<Route
					path="/home"
					element={
						<ProtectUserPages>
							<Home />
						</ProtectUserPages>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectUserPages>
							<Profile />
						</ProtectUserPages>
					}
				/>
				<Route
					path="/edit-profile"
					element={
						<ProtectUserPages>
							<EditProfile />
						</ProtectUserPages>
					}
				/>

				{/* ADMIN SIDE */}
				<Route path="/admin" element={<AdminInitialPathHandle />} />
				<Route
					path="/admin/signin"
					element={
						<ProtectAdminAuth>
							<AdminSignIn />
						</ProtectAdminAuth>
					}
				/>
				<Route
					path="/admin/home"
					element={
						<ProtectAdminPages>
							<AdminHomePage />
						</ProtectAdminPages>
					}
				/>
				<Route
					path="/admin/dashboard"
					element={
						<ProtectAdminPages>
							<Dashboard />
						</ProtectAdminPages>
					}
				/>
				<Route
					path="/admin/edit-user/:id"
					element={
						<ProtectAdminPages>
							<EditUser />
						</ProtectAdminPages>
					}
				/>
				<Route
					path="/admin/add-user"
					element={
						<ProtectAdminPages>
							<AddUser />
						</ProtectAdminPages>
					}
				/>
				<Route
					path="/admin/edit-admin"
					element={
						<ProtectAdminPages>
							<EditAdmin />
						</ProtectAdminPages>
					}
				/>
				<Route
					path="*"
					element={
							<ErrorPage />
					}
				/>
				
			</Routes>
		</Router>
	);
}

export default App;
