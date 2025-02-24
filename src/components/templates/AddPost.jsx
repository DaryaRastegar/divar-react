import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getCategory } from 'src/services/admin'
import styles from './AddPost.module.css'
import { getCookie } from 'src/utils/cookie'
import axios from 'axios'
import toast from 'react-hot-toast'

function AddPost() {
  const { data } = useQuery(['get-categories'], getCategory)
  const [form, setForm] = useState({
    title: '',
    conetnt: '',
    category: '',
    city: '',
    amount: null,
    images: null,
  })

  const changeHandler = (e) => {
    const name = e.target.name
    if (name !== 'images') {
      setForm({ ...form, [name]: event.target.value })
    } else {
      setForm({ ...form, [name]: e.target.files[0] })
    }
  }
  const addHandler = (e) => {
    e.preventDefault()
    console.log(form)
    const formData = new FormData()
    for (let i in form) {
      formData.append(i, form[i])
    }
    const token = getCookie('accessToken')
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error('مشکلی پیش آمده است'))
  }
  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">اسم دسته بندی</label>
      <textarea name="conetnt" id="conetnt" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      <label htmlFor="categpory">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس </label>
      <input type="file" name="images" id="images" />
      <button onClick={addHandler}>ایجاد</button>
    </form>
  )
}

export default AddPost
