import React, { useState } from 'react'

import styles from './CategoryForm.module.css'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { addCategory } from 'services/admin'

function CategoryForm() {
  const [form, setForm] = useState({ name: '', slug: '', icon: '' })
  const queryClient = useQueryClient()

  const { status, mutate, isLoading, error, variables } = useMutation(
    addCategory,
    { onSuccess: () => queryClient.invalidateQueries('get-categories') }
  )
  console.log({ status, isLoading, error, variables })

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(form)
    if (!form.name || !form.slug || !form.icon) return
    mutate(form)
  }
  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3> دسته بندی جدید</h3>
      {!!error && <p>مشکای پیش آمده است</p>}
      {status === 'success' && <p>دسته بندی با موفقیت ارسال شد</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isLoading}>
        اضافه کنید
      </button>
    </form>
  )
}

export default CategoryForm
