import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const BlogsContext = createContext();

const BlogsContextProvider = ({ children }) => {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		axios("https://knock-dubai-backend.vercel.app/get-blogs", {
			method: "GET"
		})
			.then((res) => {
				if (res.data.error) {
					console.error(res.data.message)
				}
				else {
					setBlogs(res.data.blogs)
				}
			})
			.catch((err) => {
				console.error(err.message)
			})
	}, []);

	return <BlogsContext.Provider value={{ blogs, setBlogs }}>
		{children}
	</BlogsContext.Provider>
}

const UseBlogs = () => {
	return useContext(BlogsContext)
}

export { UseBlogs, BlogsContextProvider };