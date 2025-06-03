
const BaseURL='customer'
export const AUTH_USER_API = {
    Singup:`${BaseURL}/signup`,
    AuthUser:`${BaseURL}/authuser`,
    Login:`${BaseURL}/login`
  } as const;
const ProductBaseURL='products'

  export const Product_API = {
     LatestProduct:ProductBaseURL,
     Pagination:`${ProductBaseURL}/search`,
     GetById:`${ProductBaseURL}/getbyId`,
     AddProduct:ProductBaseURL
  } as const;

const OrderBaseUrl="cart-order"

  export const Order_API = {
     AddToCart:`${OrderBaseUrl}/add`,
     GetCart:`${OrderBaseUrl}/items`,
     Checkout:`${OrderBaseUrl}/order`,
     History:`${OrderBaseUrl}/history`
  
  } as const;
