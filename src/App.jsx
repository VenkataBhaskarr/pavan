import {Route , Routes} from "react-router-dom";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  )
}
export default App
