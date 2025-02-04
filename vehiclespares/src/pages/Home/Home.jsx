import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Nav from '../../components/Nav/Nav'
import Hero from '../../components/Hero/Hero'
import CategoryCards from '../../components/CategoryCards/CategoryCards'
import TrendingSearches from '../../components/TrendingSearches/TrendingSearches'
import QuickFixes from '../../components/QuickFixes/Quickfixes'

const Home = () => {
  return (
    <div>
        <Hero />
        <CategoryCards />
        <TrendingSearches />
        <QuickFixes />
    </div>
  )
}

export default Home