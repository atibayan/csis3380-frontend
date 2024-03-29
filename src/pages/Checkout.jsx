import React, { useState, Fragment } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffectOnce } from "../utils/useEffectOnce";
import { Link } from "react-router-dom";
import { CheckoutProvider, useCheckout } from "../context/CheckoutContext";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import ReviewOrder from "../components/ReviewOrder";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { GridLoader } from "react-spinners";
import CartEmpty from "../components/CartEmpty";

const steps = ["Shipping", "Payment and Billing", "Review and Place Order"];

const StyledStack = (props) => {
  return (
    <Stack
      sx={{
        width: "calc(350px + 30vw)",
        my: "5vh",
        mx: "auto",
        p: 2,
      }}>
      {props.children}
    </Stack>
  );
};

const StyledHeading = () => {
  const theme = useTheme();
  return (
    <Typography
      variant="h5"
      sx={{
        height: "70px",
        p: 2,
        backgroundColor: theme.palette.bg.paper,
      }}>
      CHECKOUT
    </Typography>
  );
};

const StyledBox = (props) => {
  return <Box p={2}>{props.children}</Box>;
};

const CheckoutPanes = () => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    isValidEmail,
    isValidFirstName,
    isValidLastName,
    isValidAddress,
    isValidPostalCode,
    isValidShippingPhone,
    country,
    provinceList,
    state,
    isBillingAddressSame,
    isValidBillingPostalCode,
    isValidBillingAddress,
    isValidCardNumber,
    isValidCardExpiration,
    isValidCVV,
    isValidCardName,
    billingCountry,
    billingState,
    billingProvinceList,
    placeOrder,
    waitForServer,
  } = useCheckout();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      placeOrder();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isValidStep = () => {
    if (activeStep === 0)
      return (
        isValidEmail &&
        isValidFirstName &&
        isValidLastName &&
        isValidShippingPhone &&
        isValidAddress &&
        isValidPostalCode &&
        country !== "" &&
        (provinceList.length === 0 || (provinceList.length > 0 && state !== ""))
      );
    else if (activeStep === 1)
      return (
        isValidCardName &&
        isValidCardExpiration &&
        isValidCardNumber &&
        isValidCVV &&
        (isBillingAddressSame ||
          (!isBillingAddressSame &&
            isValidBillingAddress &&
            isValidBillingPostalCode &&
            billingCountry !== "" &&
            (billingProvinceList.length === 0 ||
              (billingProvinceList.length > 0 && billingState !== ""))))
      );
    else return true;
  };

  return (
    <StyledStack>
      <StyledHeading />
      <StyledBox>
        {activeStep === steps.length ? null : (
          <Fragment>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext} disabled={!isValidStep()}>
                {activeStep === steps.length - 1 ? "Confirm and Pay" : "Next"}
              </Button>
            </Box>
          </Fragment>
        )}
        {activeStep === 0 ? (
          <Shipping />
        ) : activeStep === 1 ? (
          <Payment />
        ) : activeStep === 2 ? (
          <ReviewOrder />
        ) : waitForServer ? (
          <Loading />
        ) : null}
      </StyledBox>
    </StyledStack>
  );
};

const OrderAcknowledgment = () => {
  const theme = useTheme();
  const { setOrderJustPlaced, orderData, setOrderData } = useCheckout();
  useEffectOnce(() => {
    return () => {
      setOrderJustPlaced(false);
      setOrderData({});
    };
  }, []);
  return (
    <Fragment>
      <StyledStack>
        <StyledHeading />
        <StyledBox>
          <Typography variant="h5" align="center">
            {orderData.oid !== null
              ? "Order placed successfully!"
              : "Oopss... Something went wrong. :("}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            {orderData.status === 201 ? (
              <CheckCircleOutlineIcon sx={{ fontSize: "100px" }} />
            ) : (
              <DangerousIcon color="error" sx={{ fontSize: "100px" }} />
            )}
          </Box>

          {orderData.status === 201 ? (
            <Typography variant="subtitle2" align="center">
              Your order reference number is : <strong>{orderData.oid}</strong>
            </Typography>
          ) : null}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setOrderJustPlaced(false);
                  setOrderData({});
                }}>
                Back to Shopping
              </Button>
            </Link>
          </Box>
        </StyledBox>
      </StyledStack>
    </Fragment>
  );
};

const Loading = () => {
  const theme = useTheme();
  return (
    <Fragment>
      <Typography variant="h5" align="center">
        Your order is being processed
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 5,
        }}>
        <GridLoader
          size={30}
          color={theme.palette.primary.main}
          speedMultiplier={1}
        />
      </Box>
      <Typography variant="h6" align="center">
        Please do not leave this page
      </Typography>
    </Fragment>
  );
};

const CheckoutCartEmpty = () => {
  const { orderJustPlaced } = useCheckout();
  return orderJustPlaced ? (
    <OrderAcknowledgment />
  ) : (
    <StyledStack>
      <CartEmpty />
    </StyledStack>
  );
};

const CannotCheckout = () => {
  const { setDrawerState } = useShoppingCart();
  return (
    <Fragment>
      <StyledStack>
        <Typography
          variant="h5"
          color="error"
          sx={{
            display: { xs: "flex", md: "flex" },
            letterSpacing: ".2rem",
            justifyContent: "center",
            m: 3,
          }}>
          UNAVAILABLE PRODUCT!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <figure style={{ display: "flex", flexFlow: "column" }}>
            <img
              src="/img/cancel.png"
              alt="/img/cancel.png"
              style={{ width: "calc(80px + 50%)" }}
            />
            <Button
              variant="text"
              color="secondary"
              size="small"
              href="https://www.flaticon.com/free-icons/close"
              sx={{
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}>
              Credits: Flaticon
            </Button>
          </figure>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: "center",
              m: 3,
            }}>
            Looks like you have unavailable products in your cart. Delete from
            cart before check out.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Link to={{}} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setDrawerState(true)}>
              Open Cart
            </Button>
          </Link>
        </Box>
      </StyledStack>
    </Fragment>
  );
};

const Checkout = () => {
  const { cartQuantity, canCheckout } = useShoppingCart();

  if (!canCheckout()) {
    return <CannotCheckout />;
  }

  return (
    <CheckoutProvider>
      {cartQuantity === 0 ? <CheckoutCartEmpty /> : <CheckoutPanes />}
    </CheckoutProvider>
  );
};

export default Checkout;
