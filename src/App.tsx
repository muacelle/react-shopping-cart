import './App.css'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Drawer } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Badge from '@mui/material/Badge'
import Item from './components/Item'
import { Wrapper, StyledButton } from './styles/App.styles'
import Cart from './components/Cart'

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

  const localCart = localStorage.getItem('cart')

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(JSON.parse(localCart) as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0)
  }

  const addToCart = (clickedItem: CartItemType) => {

    const isItemInCart = cartItems.find(item => item.id === clickedItem.id)

    if (isItemInCart) {
      const updatedCart = cartItems.map(item => (
        item.id === clickedItem.id ? {...clickedItem, amount: item.amount + 1} : item
      ))
      setCartItems(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    else {
      const updatedCart = [...cartItems, {...clickedItem, amount: 1}]
      setCartItems(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

  }

  const removeFromCart = (id: number) => {

    const updatedCart = cartItems.reduce((ack, item) => {
      if (item.id === id) {
        if (item.amount === 1) return ack
        return [...ack, { ...item, amount: item.amount - 1 }]
      }
      else {
        return [...ack, item]
      }
    }, [] as CartItemType[])

    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))

  }

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong!</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
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