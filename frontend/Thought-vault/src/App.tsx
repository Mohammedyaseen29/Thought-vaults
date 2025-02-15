import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/Sign-up"
import SignIn from "./components/Sign-in"
import Thoughts from "./components/Thoughts"
import Landing from "./components/Landing"
import Vault from "./components/Vault"
import ProtectedRoute from "./components/ProtectedRoute"
import SharePage from "./components/SharePage"
import ShareContents from "./components/ShareContents"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/vault/:id" element={<Vault />} />
        </Route>
        <Route path="/vault/share/:id" element={<ShareContents/>} />
        <Route path="/thoughts/:hash" element={<SharePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App