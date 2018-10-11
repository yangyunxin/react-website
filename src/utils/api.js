const API = {
  authLogin: '/api/auth/oauth/token',
  productList: '/api/goods/tProduct/page',
  UpdateProduct: '/api/goods/tProduct/update', //put
  addProduct: '/api/goods/tProduct', //post
  getProductById: '/api/goods/tProduct/',
  orderList: '/api/goods/order/page',
  UpdateOrder: '/api/goods/order/update', //put
  getOrderById: '/api/goods/order/',
  userList: '/api/goods/tUserAccount/page',
  getUserById: '/api/goods/tUserAccount/',
  getUserAddressById: '/api/goods/tUserAccountReceiveAddress/',
  getUserOrderById: '/api/goods/order/page'
}
export default API;
