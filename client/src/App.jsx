//* ====== Imports of BuiltIn Components ====== */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//* ====== Imports of Pages ====== */
import { Home, AuthPage } from "./pages/imports";


//* ====== Main App Component ====== */
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<AuthPage />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
