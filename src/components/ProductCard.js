import React from 'react';
import { IconButton, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';

import {AddCartBtn, MinusCartBtn, QtyBtn, CartBtn} from './CartButtons';

import "@fontsource/akshar"
import { useShoppingCart } from '../context/ShoppingCartContext';

const heartInactiveStyle = {
  color: '#a9a9a9',
  opacity: '80%',
  stroke: 'white',
  strokeWidth: 2
}

export default function ProductCard({item}) {
  const { isInCart, addToWishlist, isInWishlist } = useShoppingCart()
  return (
    <Card sx={{ maxWidth: 230, minWidth: 230, minHeight: '350px', position: 'relative' }}>
      
      <CardMedia //image of the product, need to handle onClick
        sx={{ height: 230, width: 230 }}
        image={item.images[0].signedImage}
        title={item.name}
      />

      <CardContent >
        <Typography gutterBottom variant="h6" component="div" sx={{
          fontFamily: 'akshar',
          minHeight: '70px',
        }}>
          {item.name.toUpperCase()}
        </Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
        }}>
          <Typography variant="h6" component="div" sx={{
            fontFamily: 'akshar',
            mt: 1,
          }}>CAD $ {(item.price * 1).toFixed(2)}</Typography>

          {isInCart(item._id) ?
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
              <MinusCartBtn item={item}/>
              <QtyBtn item={item}/>
              <AddCartBtn item={item} />
            </Box>
            : <CartBtn item={item} /> }
        </Box>

      </CardContent>
      <CardActions sx={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'end',
        gap: '5px',
        top: 0,
        right: 0,
        margin: '5px',
        padding: 0,
      }}>
        
        <IconButton aria-label="add to wishlist" p={0} m={0} onClick={() => addToWishlist(item._id)} >
          {isInWishlist(item._id) ?
            <FavoriteIcon color='secondary' /> :
            <FavoriteIcon sx={heartInactiveStyle} /> }
        </IconButton>
      </CardActions>
    </Card>
  );
}