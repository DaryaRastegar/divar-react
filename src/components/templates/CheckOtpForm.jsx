import { formToJSON } from 'axios'
import { cookies } from 'src/utils/cookie'
import { checkOtp } from 'services/auth'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from 'src/services/users'
import styles from './CheckOtpForm.module.css'

function CheckOtpForm({ mobile, setCode, code, setStep }) {
  const { refetch } = useQuery(['profile'], getProfile)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    if (code.length !== 5) return

    const { response, error } = await checkOtp(mobile, code)
    if (response) {
      cookies(response.data)
      navigate('/')
      refetch()
    }
    if (error) {
      console.log(error)
    }
    console.log({ response, error })
  }
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره{mobile} را وارد کنید.</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text "
        id="input"
        value={code}
        placeholder="کد تایید"
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>
        تغییر شماره تلفن
      </button>
    </form>
  )
}

export default CheckOtpForm
