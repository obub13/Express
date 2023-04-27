import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useState } from 'react'

export default function About() {
  // const data = useContext(UserContext)
  // console.log(data);
  // const users = data.users
  // console.log(users);
  // const showData = () => {
  //   return (
  //     users.map((u) => {
  //       return (
  //         <div>
  //           <p>{u.id} , {u.name}</p>
  //         </div>
  //       )
  //     })
  //   )
  // }
  return (
    <div>About
      {/* {showData()} */}
    </div>
  )
}
