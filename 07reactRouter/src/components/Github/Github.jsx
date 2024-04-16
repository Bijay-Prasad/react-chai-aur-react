// import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom";


function Github() {
  const data = useLoaderData()
    // const username = "Bijay-Prasad";
    // const [data, setData] = useState()
    // useEffect(() => {
    //     fetch(`https://api.github.com/users/${username}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setData(data)
    //     })
    // }, [])
  return (
    <div className=" text-center bg-gray-600 text-white text-3xl m-4 p-4 ">Github followers: {data?.followers ?? 0}
    <img  src={data?.avatar_url ?? ""} alt="Git picture" width={300}/>
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
  const username = "Bijay-Prasad";
  const response = await fetch(`https://api.github.com/users/${username}`)
  return response.json()
}