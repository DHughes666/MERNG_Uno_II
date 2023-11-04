import {useEffect} from 'react'
import Homepage from "./components/home/Homepage";
import Blogs from "./components/blogs/blogs";
import Header from "./components/header/header";
import Auth from "./components/auth/auth";
import Footer from "./components/home/footer";
import {Routes, Route} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { authActions } from './store/auth-slice';
import Profile from './components/header/user/profile';
import AddBlog from './components/blogs/addBlog';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn)
  console.log(isLoggedIn);
  useEffect(() => {
    const data:string = localStorage.getItem("userData") as string;
    if(JSON.parse(data) !== null) {
      dispatch(authActions.login());
    } 
  }, [])
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/addblog" element={<AddBlog/>}/>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
