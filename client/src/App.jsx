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

import {ProtectUserPages, ProtectUserAuth, InitialPathHandle} from "./contexts/ProtectUserRoute";

//* ====== Main App Component ====== *//
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<InitialPathHandle />}/>
				<Route path="/signin" element={<ProtectUserAuth><SignIn /></ProtectUserAuth>} />
				<Route path="/signup" element={<ProtectUserAuth><SignUp /></ProtectUserAuth>} />
				<Route path="/home" element={<ProtectUserPages><Home /></ProtectUserPages>} />
				<Route path="/profile" element={<ProtectUserPages><Profile /></ProtectUserPages>} />
				<Route path="/edit-profile" element={<ProtectUserPages><EditProfile /></ProtectUserPages>} />

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
