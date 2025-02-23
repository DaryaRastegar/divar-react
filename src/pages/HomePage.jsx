
import React from "react";
import Main from "src/components/templates/Main";
import Sidebar from "src/components/templates/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "src/services/users";
import Loader from "src/components/moduls/Loader";
import { getCategory } from 'src/services/admin'

const style = {
  display:"flex"
}

function HomePage() {
 const {data:posts, isLoading:postsLoading}=useQuery(["post-list"],getAllPosts);
 const {data:categories, isLoading:categoryLoading} = useQuery(["get-categories"], getCategory)
 
return(
<>
{(postsLoading || categoryLoading) ? <Loader/> : (<div style={style}>
  <Sidebar categories={categories}/>
<Main  posts={posts}/>
</div>)}
</>
)

}

export default HomePage;
