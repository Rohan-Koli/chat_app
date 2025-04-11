import Navbar from "./components/Navbar"
import {Navigate, Route,Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import SettingsPage from "./pages/SettingsPage"
import SignUpPage from "./pages/SignUpPage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage"
import {useAuthStore} from "./store/useAuthStore.js"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()

  useEffect(()=>{
    checkAuth()
    console.log("this is chckauth")
  },[checkAuth])
  if(isCheckingAuth && !authUser) return(
    <div className="flex justify-center items-center  h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ?<HomePage /> :<Navigate to="login" />} />
        <Route path="/signup" element={!authUser ?<SignUpPage /> :<Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> :<Navigate to="login" /> } />
      </Routes>
      <Toaster position="top-center"
  reverseOrder={false}/>
    </div>
  )
}

export default App
