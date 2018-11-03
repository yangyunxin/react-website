const API = {
  authLogin: '/api/auth/oauth/token',
  productList: '/api/goods/tProduct/page',
  updateProduct: '/api/goods/tProduct/update', //put
  addProduct: '/api/goods/tProduct', //post
  getProductById: '/api/goods/tProduct',
  batchUpProduct: '/api/goods/tProduct/batchUpProduct', // post
  batchDownProduct: '/api/goods/tProduct/batchDownProduct', //post
  addBatch: '/api/goods/tProductPrice/addBatch',
  getProductCode: '/api/goods/tProduct/{id}/getQRCode',
  orderList: '/api/goods/order/page',
  updateOrder: '/api/goods/order/update', //put
  getOrderById: '/api/goods/order',
  deleteOrderById: '/api/goods/order',  //delete
  userList: '/api/goods/tUserAccount/page',
  upgradeUser: '/api/goods/tAgent/add', // post
  updateUser: '/api/goods/tUserAccount/update',
  getUserById: '/api/goods/tUserAccount',
  getUserAddressById: '/api/goods/tUserAccountReceiveAddress',
  getUserOrderById: '/api/goods/order/page',
  getUserLoginList: '/api/amdin/log/loginLogPage',
  agentList: '/api/goods/tAgent/page',
  getAgentById: '/api/goods/tAgent',
  addAgent: '/api/goods/tAgent/add', // post
  putAgent: '/api/goods/tAgent/update',
  agentProduct: '/api/goods/tAgentProduct/addBatch',
  deleteAgentById: '/api/goods/tAgent',
  getSkylightList: '/api/goods/tSkyLight/page',
  getSystemLogList: '/api/admin/log/logPage',
  getUserInfo: '/api/admin/user/info',
}
export default API;
