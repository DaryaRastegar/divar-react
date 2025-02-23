import { useQuery } from '@tanstack/react-query'
import { getCategory } from 'src/services/admin'
import Loader from '../moduls/Loader'

import styles from './CategoryList.module.css'

function CategoryLists() {
  const { data, isLoading } = useQuery(['get-categories'], getCategory)
  console.log({ isLoading, data })
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} alt={i.name} />
            <h5>{i.name}</h5>
            <p>{i.slug}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default CategoryLists
