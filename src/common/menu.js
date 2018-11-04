const menuData = [
  {
    name: '产品管理',
    icon: 'file-ppt',
    path: 'product',
    children: [
      {
        name: '产品维护',
        path: 'list',
      },
      {
        name: '产品添加',
        path: 'add',
      },
    ],
  },
  {
    name: '订单管理',
    icon: 'file-text',
    path: 'order',
    children: [
      {
        name: '订单维护',
        path: 'list',
      }
    ],
  },
  {
    name: '用户管理',
    icon: 'user',
    path: 'user',
    children: [
      {
        name: '用户维护',
        path: 'list',
      },
      {
        name: '用户登录日志',
        path: 'logs',
      },
    ],
  },
  {
    name: '内容管理',
    icon: 'table',
    path: 'skylight',
    children: [
      {
        name: '天窗维护',
        path: 'list',
      },
      {
        name: '天窗添加',
        path: 'add',
      },
    ],
  },
  {
    name: '代理商管理',
    icon: 'wallet',
    path: 'agent',
    children: [
      {
        name: '代理商维护',
        path: 'list',
      },
      // {
      //   name: '代理商添加',
      //   path: 'add',
      // }
    ],
  },
  {
    name: '系统管理',
    icon: 'setting',
    path: 'system',
    children: [
      {
        name: '操作日志',
        path: 'operateLog',
      },
      // {
      //   name: '数据字典',
      //   path: 'dictionary',
      // }
    ],
  },
]

export default menuData;
