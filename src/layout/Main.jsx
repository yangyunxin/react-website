import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Breadcrumb, message, Dropdown, Avatar } from 'antd';
import { Route, Link, Redirect } from 'react-router-dom';
import { authUserLogin, authUserLogout } from '../action/auth';
import MenuData from '../common/menu';
import routerData from '../common/router';
import './index.css';


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const breadcrumbNameMap = {};
Object.keys(routerData).forEach(item => {
  breadcrumbNameMap[item] = routerData[item].name
});
const redirectData = Object.keys(routerData).filter(item => routerData[item].redirect);
function getFirstChildPath(parentPath) {
  const currentMenu = MenuData.find(item => item.path === parentPath);
  if (currentMenu) {
    const childpath = currentMenu.children[0].path;
    return `/${parentPath}/${childpath}`;
  } else {
    return `/${parentPath}`;
  }
}

@connect(({ user }) => ({
  user: user
}), {
  authUserLogin,
  authUserLogout,
})
export default class Main extends React.PureComponent {
  state = {
    collapsed: false,
    selectedKeys: '1',
    openKeys: [],
    openChangeKes: []
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onMenuClick = async ({ key }) => {
    const { history } = this.props;
    if (key === 'logout') {
      try {
        const resp = this.props.authUserLogout();
        if (resp) {
          history.push('/login');
        }
      } catch (error) {
        message.error(error.msg);
      }
    }
  };

  render() {
    const { history, location } = this.props;

    const pathSnippet = location.pathname.split('/')[1];
    const childPath = getFirstChildPath(pathSnippet);

    const { collapsed } = this.state;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    // 去除没有url匹配的
    const treatedPathSnippets = pathSnippets.filter((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return breadcrumbNameMap[url];
    });
    const extraBreadcrumbItems = treatedPathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
        {
          treatedPathSnippets.length === index + 1 ? (
            <span>{breadcrumbNameMap[url]}</span>
          ) : (
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          )
        }
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    const menu = (
      <Menu onClick={this.onMenuClick} className="menu" placement="bottomRight">
        <Menu.Item><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    )
    return (
      <Layout className="main-layout" style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">
          测试后台
          </div>
          <Menu theme="dark" defaultOpenKeys={[pathSnippet]} defaultSelectedKeys={[location.pathname]} mode="inline">
            {
              MenuData.map(item => (
                <SubMenu
                  key={item.path}
                  title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
                  onTitleClick={this.onTitleClick}
                >
                {
                  item.children.map(child => (
                    <Menu.Item key={`/${item.path}/${child.path}`} onClick={() => history.push(`/${item.path}/${child.path}`)}>{child.name}</Menu.Item>
                  ))
                }
                </SubMenu>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          <Header className="top-header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="user-drop">
              <Dropdown overlay={menu}>
                <span className="action account">
                  <Avatar size="small" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  <span className="username">测试人员</span>
                </span>
              </Dropdown>
            </div>
          </Header>
          <Content>
            <Breadcrumb style={{ margin: '0 0px 16px 0', background: '#ffffff', padding: '8px 16px' }}>
              {breadcrumbItems}
            </Breadcrumb>
            <div style={{ margin: '0 16px' }}>
              {redirectData.includes(location.pathname) && <Redirect from={pathSnippet} to={childPath} />}
              {
                Object.keys(routerData).map(item => (
                  <Route key={item} exact={routerData[item].exact} path={item} component={routerData[item].component} />
                ))
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
