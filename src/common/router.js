
import Home from '../container/Home';
import ProductList from '../container/Product';
import ProductAdd from '../container/Product/Add';
import ProductDetail from '../container/Product/Detail';
import ProductEdit from '../container/Product/Edit';
import OrderList from '../container/Order';
import OrderDetail from '../container/Order/Detail';
import UserList from '../container/User';
import UserUpgrade from '../container/User/Upgrade';
import UserDetail from '../container/User/Detail';
import UserLogsList from '../container/User/Logs';
import Skylight from '../container/Skylight';
import SkylightDetail from '../container/Skylight/Detail';
import SkylightAdd from '../container/Skylight/Add';
import SkylightEdit from '../container/Skylight/Edit';
import AgentList from '../container/Agent';
import AgentDetail from '../container/Agent/Detail';
import AgentEdit from '../container/Agent/Edit';
import AgentAdd from '../container/Agent/Add';
import AgentProduct from '../container/Agent/Product';
import OperateLog from '../container/System/index';

const routerData = {
  '/': {
    name: '首页',
    component: Home,
    exact: true,
  },
  '/product': {
    name: '产品管理',
    redirect: true,
  },
  '/product/list': {
    name: '产品维护',
    component: ProductList,
  },
  '/product/add': {
    name: '产品添加',
    component: ProductAdd
  },
  '/product/detail': {
    name: '产品详情',
  },
  '/product/detail/:id': {
    component: ProductDetail
  },
  '/product/edit': {
    name: '产品详情',
  },
  '/product/edit/:id': {
    component: ProductEdit
  },
  '/order': {
    name: '订单管理',
    redirect: true,
  },
  '/order/list': {
    name: '订单维护',
    component: OrderList,
  },
  '/order/detail': {
    name: '订单详情',
  },
  '/order/detail/:id': {
    component: OrderDetail
  },
  '/user': {
    name: '用户管理',
    redirect: true,
  },
  '/user/list': {
    name: '用户维护',
    component: UserList,
  },
  '/user/upgrade': {
    name: '代理商添加',
  },
  '/user/upgrade/:id': {
    component: UserUpgrade,
  },
  '/user/detail': {
    name: '用户详情',
  },
  '/user/detail/:id': {
    component: UserDetail
  },
  '/user/logs': {
    name: '用户登录日志',
    component: UserLogsList,
  },
  '/skylight': {
    name: '内容管理',
    redirect: true,
  },
  '/skylight/list': {
    name: '天窗维护',
    component: Skylight,
  },
  '/skylight/detail': {
    name: '天窗详情',
  },
  '/skylight/detail/:id': {
    component: SkylightDetail
  },
  '/skylight/edit': {
    name: '天窗编辑',
  },
  '/skylight/edit/:id': {
    component: SkylightEdit,
  },
  '/skylight/add': {
    name: '天窗添加',
    component: SkylightAdd,
  },
  '/agent': {
    name: '代理商管理',
    redirect: true,
  },
  '/agent/list': {
    name: '代理商维护',
    component: AgentList,
  },
  '/agent/detail': {
    name: '代理商详情',
  },
  '/agent/detail/:id': {
    component: AgentDetail,
  },
  '/agent/edit': {
    name: '代理商编辑',
  },
  '/agent/edit/:id': {
    component: AgentEdit,
  },
  '/agent/add': {
    name: '代理商添加',
    component: AgentAdd,
  },
  '/agent/product': {
    name: '代理商关联产品列表',
  },
  '/agent/product/:id': {
    component: AgentProduct,
  },
  '/system': {
    name: '系统管理',
    redirect: true,
  },
  '/system/operateLog': {
    name: '操作日志',
    component: OperateLog
  }
}
export default routerData;
