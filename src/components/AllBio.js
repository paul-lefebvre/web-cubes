import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "./Utils";
import Card2 from "./Bio/Card2";


const AllBio = () => {
	const [loadBio, setLoadBio] = useState(true);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postReducer);

	const loadMore = () => {
		if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
			setLoadBio(true);
		}
	};

	useEffect(() => {
		if(loadBio) {
			dispatch(getPosts());
			setLoadBio(false)
		}

		window.addEventListener("scroll", loadMore);
		return () => window.removeEventListener("scroll", loadMore);
	}, [loadBio, dispatch]);

	return (
		<div className="thread-container">
			<ul>
				{!isEmpty(posts[0]) && posts.map((post) => {
					return <Card2 post={post} key={post.usr_id}/>
				})}
			</ul>
		</div>
	)

	}

export default AllBio;