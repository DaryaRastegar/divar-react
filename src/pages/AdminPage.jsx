import React from 'react'
import CateforyForm from 'src/components/templates/CategoryForm'
import CategoryLists from 'src/components/templates/CategoryLists'

function AdminPage() {
  console.log("Admin Page")
  return (
    <div>
      <CategoryLists/>
      <CateforyForm/>
    </div>
  )
}

export default AdminPage