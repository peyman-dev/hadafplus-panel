import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './core/redux/store'
import { getDomains } from './core/redux/actions'
import HomePage from './pages/home/page'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  // Get and save all domains from API
  useEffect(() => {
    dispatch(getDomains())
    return () => { };
  }, [])

  return <HomePage />
}

export default App