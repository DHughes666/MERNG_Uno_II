import Homepage from "./components/home/Homepage";
import Blogs from "./components/blogs/blogs";
import Header from "./components/header/header";
import Auth from "./components/auth/auth";
import Footer from "./components/home/footer";
import {Routes, Route} from "react-router-dom";

function App() {
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
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
