//* ====== Imports of BuiltIn Components ====== *//
import { Fragment } from 'react'


//* ====== Imports of Child Components ====== *//
import Header from '../components/Home/Header'
import HomeBody from '../components/Home/HomeBody'


//* ====== HomePage Component ====== *//
const Home = () => {
  return (
    <Fragment>
        <Header />
        <HomeBody />
    </Fragment>
  )
}

export default Home