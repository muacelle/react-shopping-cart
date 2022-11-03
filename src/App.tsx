import './App.css'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Drawer } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
 import Grid from '@mui/material/Grid'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Badge from '@mui/material/Badge'
import { Wrapper } from './App.styles'

// Types

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => {
  const results = await fetch('https://fakestoreapi.com/products')
  const products = await results.json()
  return products
}

function App() {

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)

  return (
    <div className="App">
      <h1>App</h1>
    </div>
  )
}

export default App