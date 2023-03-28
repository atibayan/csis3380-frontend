import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Drawer,
  Avatar,
  Divider,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { AddCartBtn, MinusCartBtn, QtyBtn, DeleteBtn } from "./CartButtons";
import { Link } from "react-router-dom";

import { useShoppingCart } from "../context/ShoppingCartContext";

const styledTableCell = {
  padding: 0.5,
};

const CartEmpty = () => {
  const { toggleDrawer } = useShoppingCart();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h5"
        noWrap
        sx={{
          display: { xs: "flex", md: "flex" },
          flexGrow: { xs: 1, md: 0 },
          fontFamily: "monospace",
          fontWeight: 500,
          letterSpacing: ".2rem",
          color: "inherit",
          textDecoration: "none",
          borderRadius: "5px",
          padding: "0px 5px",
          justifyContent: "center",
          m: 3,
        }}
      >
        Your Cart is empty
      </Typography>
      <Link to="/products">
        <Button variant="contained" onClick={() => toggleDrawer()}>
          Browse Products
        </Button>
      </Link>
    </Box>
  );
};

const CartSummary = () => {
  const { subTotalCart, totalCart } = useShoppingCart();
  return (
    <TableContainer>
      <Table sx={{ width: "90%", mx: "auto" }}>
        <TableBody>
          <TableRow>
            <TableCell sx={styledTableCell}>Subtotal</TableCell>
            <TableCell align="right" sx={styledTableCell}>
              {subTotalCart.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styledTableCell}>GST (5%)</TableCell>
            <TableCell sx={styledTableCell} align="right">
              {(subTotalCart * 0.05).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styledTableCell}>PST (7%)</TableCell>
            <TableCell align="right" sx={styledTableCell}>
              {(subTotalCart * 0.07).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styledTableCell}>Shipping</TableCell>
            <TableCell align="right" sx={styledTableCell}>
              {subTotalCart >= 100 ? "0" : "10.00"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styledTableCell}>
              <Typography variant="h6">Total</Typography>
            </TableCell>
            <TableCell align="right" sx={styledTableCell}>
              <Typography variant="h6">CAD ${totalCart.toFixed(2)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CartItem = ({ id, quantity }) => {
  const { products, getQuantity } = useShoppingCart();

  const product = products.find((item) => item._id === id);

  if (product == null) return null;
  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      spacing={2}
      justifyContent="space-between"
    >
      <Avatar
        src={product.images[0].signedImage}
        variant="rounded"
        sx={{ height: 100, width: 100 }}
      />
      <Box sx={{ width: 1 / 2 }}>
        <Box>{product.name.toUpperCase()}</Box>
        <Box>${(product.price * 1).toFixed(2)}</Box>
        <Box>
          <MinusCartBtn item={{ _id: id, quantity }} />
          <QtyBtn item={{ _id: id, quantity }} />
          <AddCartBtn item={{ _id: id, quantity }} />
        </Box>
        <Box>
          {product.quantity_on_hand < 200 ? (
            <Typography variant="caption">Only a few left in stock!</Typography>
          ) : null}
        </Box>
      </Box>

      <Box sx={{ width: 1 / 3, textAlign: "right" }}>
        Subtotal
        <br />${(product.price * getQuantity(id)).toFixed(2)}
      </Box>

      <Box>
        <DeleteBtn item={{ _id: id, quantity }} />
      </Box>
    </Stack>
  );
};

export default function CartDrawer() {
  const {
    drawerState,
    toggleDrawer,
    cartItems,
    subTotalCart,
    cartQuantity,
  } = useShoppingCart();

  return (
    <Drawer
      anchor="right"
      PaperProps={{
        sx: {
          width: "calc(320px + 10vw)",
          p: 2,
        },
      }}
      open={drawerState}
      onClose={() => toggleDrawer()}
    >
      {cartQuantity == 0 ? (
        <CartEmpty />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            noWrap
            sx={{
              display: { xs: "flex", md: "flex" },
              flexGrow: { xs: 1, md: 0 },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              borderRadius: "5px",
              padding: "0px 5px",
              justifyContent: "center",
              m: 3,
            }}
          >
            Your Cart
          </Typography>
          <Stack direction={"column"} spacing={2} divider={<Divider />}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
          <Divider sx={{ my: 1, backgroundColor: "black", opacity: 0.3 }} />
          <CartSummary />
          <Box m={2} p={2}>
            <Link to="/checkout">
              <Button variant="contained" onClick={() => toggleDrawer()}>
                Checkout
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}