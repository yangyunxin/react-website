const API = {
  authLogin: '/api/auth/oauth/token',
  productList: '/api/goods/tProduct/page',
  updateProduct: '/api/goods/tProduct/update', //put
  addProduct: '/api/goods/tProduct', //post
  getProductById: '/api/goods/tProduct/',
  batchUpProduct: '/api/goods/tProduct/batchUpProduct', // post
  batchDownProduct: '/api/goods/tProduct/batchDownProduct', //post
  orderList: '/api/goods/order/page',
  UpdateOrder: '/api/goods/order/update', //put
  getOrderById: '/api/goods/order/',
  userList: '/api/goods/tUserAccount/page',
  getUserById: '/api/goods/tUserAccount/',
  getUserAddressById: '/api/goods/tUserAccountReceiveAddress/',
  getUserOrderById: '/api/goods/order/page',
  agentList: '/api/goods/tAgent/page',
  getAgentById: '/api/goods/tAgent/',
  addAgent: '/api/goods/tAgent/add', // post
  putAgent: '/api/goods/tAgent/update',
}
export default API;
