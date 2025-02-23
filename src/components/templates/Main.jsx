import React from 'react'
import { sp } from 'src/utils/number'
import styles from './Main.module.css'

const defaultImage = 'Default_Image.png'

function Main({ posts }) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  console.log(posts)
  return (
    <div className={styles.container}>
      {posts?.data?.posts?.map((post) => (
        <div key={post?._id} className={styles.card}>
          <div className={styles.info}>
            <p>{sp(post?.amount)}تومان</p>
            <span>{post?.options?.city || ' '}</span>
          </div>
          {post?.images[0] && post?.images[0].length > 0 ? (
            <img src={`${baseUrl}${post?.images[0]}`} alt="" />
          ) : (
            <img src={defaultImage} alt="defalt" />
          )}
        </div>
      ))}
    </div>
  )
}

export default Main
