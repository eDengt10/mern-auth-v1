//* ====== Imports of BuiltIn Components ====== *//
import React, { Fragment } from 'react'
import ProfilePage from '../components/Profile/Profile'
import Header from '../components/Home/Header'


//* ====== ProfilePage Component ====== *//
const Profile = () => {
  return (
    <Fragment>
      <Header />
      <ProfilePage />
    </Fragment>
  )
}

export default Profile