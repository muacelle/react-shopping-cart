import './App.css'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Drawer } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Badge from '@mui/material/Badge'
import { Wrapper } from './styles/App.styles'
import Item from './components/Item'

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

  const getTotalItems = () => null
  const addToCart = (clickedItem: CartItemType) => null
  const removeFromCart = () => null

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong!</div>

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default App