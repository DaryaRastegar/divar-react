import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPosts } from 'src/services/users'
import Loader from '../moduls/Loader'
import { sp } from 'src/utils/number'
import styles from "./PostList.module.css"
const defaultImage = "Default_Image.png"

function PostList() {
    const{data,isLoading}=useQuery(["my-post-list"],getPosts);
    console.log(data)
  return (
    <div className='styles.list'>
        {isLoading ? <Loader/> : (
            <>
            <h3>آگهی های شما</h3>
            {data?.data?.posts?.map(post => <div key={post._id} className={styles.post}>
                {post.images[0] ? (
                    <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} alt="" />
                ) : (
                    <img src={defaultImage} alt="defalt" />
                )}
                <div>
                    <p>{post.options.title}</p>
                    <span>{post.options.title}</span>
                </div>
                <div className={styles.price}>
                    <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                    <span>{sp(post.amount)}تومان</span>
                </div>
            </div>)}
            </>
        )}
    </div>
  )
}

export default PostList