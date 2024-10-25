//* ====== Imports of BuiltIn Components ====== *//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//* ====== Imports of Pages ====== *//
import { Home, AuthPage, About, Profile } from "./pages/imports";


//* ====== Main App Component ====== *//
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<AuthPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
