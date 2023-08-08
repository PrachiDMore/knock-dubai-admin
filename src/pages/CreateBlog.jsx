import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BiLink } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';

const CreateBlog = () => {
	const cloudinaryRef = useRef()
	const [otherImage, setOtherImage] = useState([])
	const buttonRef = useRef()
	const uploadToCloudinary = (img) => {
		const formData = new FormData();
		formData.append("file", img);
		formData.append("upload_preset", "w1rgx4hk");
		formData.append("folder", "blog");
		fetch(`https://api.cloudinary.com/v1_1/dwcvssznn/image/upload`, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then(async (data) => {
				setFormState({
					...formState,
					"mainImg": data?.secure_url
				})
			})
	};
	let data = []

	useEffect(() => {
		const cloudName = "hzxyensd5"; // replace with your own cloud name
		const uploadPreset = "aoh4fpwm"; // replace with your own upload preset
		cloudinaryRef.current = window.cloudinary;
		buttonRef.current = window.cloudinary.createUploadWidget(
			{
				cloudName: cloudName,
				uploadPreset: uploadPreset,
				multiple: true,
				folder: "blog-other",
			},
			(error, result) => {
				if (!error && result && result.event === "success") {
					data.push(result.info.secure_url)
				}
				if (result.event === "queues-end") {
					setOtherImage(data)
				}
			}
		);
	}, []);
	const initialState = {
		title: "",
		description: "",
		author: "",
		mainImg: "",
		tags: "",
		timeReq: ""
	}
	const [img, setImg] = useState('')
	const [formState, setFormState] = useState(initialState);
	const [content, setContent] = useState("");
	const navigate = useNavigate()


	const { id } = useParams()
	var toolbarOptions = [
		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],
		['link', 'image'],
		[{ 'header': 1 }, { 'header': 2 }],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'script': 'sub' }, { 'script': 'super' }],
		[{ 'indent': '-1' }, { 'indent': '+1' }],
		[{ 'direction': 'rtl' }],
		[{ 'size': ['small', false, 'large', 'huge'] }],
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		[{ 'color': [] }, { 'background': [] }],
		[{ 'font': [] }],
		[{ 'align': [] }],
		['clean']
	];

	const handleBlog = () => {
		if (!id) {
			axios("https://knock-dubai-backend.vercel.app/create", {
				method: "POST",
				data: { ...formState, content: content, otherImgs: otherImage }
			})
				.then((res) => {
					window.location.href = "/view/blogs"
				})
				.catch((err) => {
					console.log(err)
				})
		} else {
			axios(`https://knock-dubai-backend.vercel.app/update/${id}`, {
				method: "PATCH",
				data: { ...formState, content: content, otherImgs: otherImage }
			})
				.then((res) => {
					if (!res.data.error) {
						window.location.href = "/view/blogs"
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			getBlog()
		} else {
			window.location.href = "/"
		}

	}, [id]);

	const getBlog = async () => {
		if (id) {
			axios(`https://knock-dubai-backend.vercel.app/get-blog/${id}`, {
				method: "GET",
			})
				.then((res) => {
					setFormState(res.data.blog)
					setContent(res.data.blog.content)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}


	const uploadFiles = (file, stateSetter, path) => {
	}
	return (
		<>
			<Navbar />
			<section className='p-10 custom-width min-h-screen dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='font-bold text-3xl'>{id ? "Update" : "Create"} Blog</h1>
				<div className='py-8'>
					<section className="dark:bg-gray-900">
						<div className="p-4">
							<div>
								<div className="grid gap-4">
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
										<input type="text" value={formState?.title} onChange={handleChange} name="name" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Blog Title" required="" />
									</div>
									<div className="sm:col-span-2">
										<label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
										<textarea value={formState?.description} onChange={handleChange} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write description here"></textarea>
									</div>
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
										<input type="text" value={formState?.author} onChange={handleChange} name="name" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Author name" required="" />
									</div>
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Required</label>
										<input type="text" value={formState?.timeReq} onChange={handleChange} name="timeReq" id="timeReq" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Time Required" required="" />
									</div>
									<div className="sm:col-span-2">
										<label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main Image</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadToCloudinary(e.target.files[0]) }} type="file" accept='img/*' className={img.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{img.length > 0 && <a href={img} target='_blank' className='text-blue-500'><BiLink /></a>}
											{formState?.mainImg && <a href={formState?.mainImg} target='_blank'><BiLink /></a>}
										</div>
									</div>
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Other Images</label>
										<div onClick={() => {
											buttonRef.current.open()
										}} type="text" readOnly name="name" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="choose multiple images" required="">{otherImage?.length === 0 ? "Choose multiple images" : `Images uploaded: ${otherImage.length}`}</div>
									</div>
									<div className="sm:col-span-2">
										<label for="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
										<input type="text" value={formState?.tags} onChange={handleChange} name="tags" id="tags" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tags" required="" />
									</div>
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
										<ReactQuill modules={{ toolbar: toolbarOptions }} placeholder='Type content here' className='h-[300px] col-span-2 w-full' theme="snow" value={content} onChange={setContent} />
									</div>
								</div>
								<button onClick={handleBlog} type="button" className=" inline-flex items-center px-5 py-2.5 mt-[3.5rem] text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
									Submit
								</button>
							</div>
						</div>
					</section>
				</div>
			</section>
		</>
	)
}

export default CreateBlog
