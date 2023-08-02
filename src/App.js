import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthContextProvider } from './context/Auth';
import { BlogsContextProvider } from './context/Blogs';
import CreateBlog from './pages/CreateBlog';
import ViewBlogs from './pages/ViewBlogs';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <BlogsContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/blog" element={<CreateBlog />} />
              <Route path="/view/blogs" element={<ViewBlogs />} />
              <Route path="/edit-blog/:id" element={<CreateBlog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </BlogsContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
