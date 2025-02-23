import React from 'react'
import { sendOtp } from 'services/auth'
import styles from './SendOtpFrom.module.css'

function SendOtpFrom({ mobile, setMobile, setStep }) {
  const submitHandler = async (e) => {
    e.preventDefault()
    if (mobile.length !== 11) return

    const { response, error } = await sendOtp(mobile)
    setStep(2)
    console.log({ response, error })
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید . کد
        تایید به این شماره پیامک خواهد شد
      </span>
      <label htmlFor="input"> شماره موبایل خود را وارد کنید</label>
      <input
        type="text "
        placeholder="شماره موبایل "
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        id="input"
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  )
}

export default SendOtpFrom
