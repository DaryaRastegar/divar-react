
import Header from './Header'
import Footer from './Footer'

import styles from "./Layouts.module.css"

function Layouts({children}) {
  return (
    <div className={styles.main}>
    <Header/>
    {children}
    <Footer/>
    </div>
  )
}

export default Layouts