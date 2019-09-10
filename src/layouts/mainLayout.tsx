import React, { useEffect, useState, Fragment } from 'react'
import styles from './index.scss'
import { Icon, Layout, Menu, Tabs, Dropdown, Button } from 'antd'
import { menuList } from '@/utils/menuList'
import { router, Link } from 'umi'
import { IMenuItem } from '@/utils/menuList'
import { ClickParam } from 'antd/lib/menu'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

interface ITab {
  title: string
  key: string
  path: string
}

const MainLayout = (props: any) => {

  //控制侧边栏的开关
  const [collapsed, setCollapsed] = useState<boolean>(false)
  //tabs路由导航
  const [tabs, setTabs] = useState<Array<ITab>>([])
  //tabs的活动key
  const [activeKey, setActiveKey] = useState<string>('')
  //menu的key
  const [menuKey, setMenuKey] = useState<Array<string>>([])
  //控制content刷新
  const [refresh, setRefresh] = useState<boolean>(true)


  //根据路由变化来生成tabs
  useEffect(() => {
    const router = props.children.props.location.pathname
    let routerList: Array<string> = router.split('/')
    menuList.forEach((item: IMenuItem) => {
      if (routerList.includes(item.path)) {
        item.children.forEach((item1: IMenuItem) => {
          if (routerList.includes(item1.path)) {
            const index = tabs.findIndex((tabItem: ITab) => tabItem.title === item1.title)
            let tmpTabs: Array<ITab> = [...tabs]
            if (index === -1) {
              const key = new Date().getTime().toString()
              tmpTabs.push({
                title: item1.title,
                path: router,
                key,
              })
              setActiveKey(key)
            } else {
              tmpTabs[index].path = router
              setActiveKey(tmpTabs[index].key)
            }
            setMenuKey([item1.id.toString()])
            setTabs(tmpTabs)
          }
        })
      }
    })
  }, [props.children.props.location.pathname])

  //当刷新参数变化时将其再次变化实现刷新
  useEffect(() => {
    if(!refresh)  setRefresh(true)
  },[refresh])

  //tabItem点击事件
  const handleTabClick = (key: string) => {
    const tab = tabs.find((tab: ITab) => tab.key === key)
    if (tab) router.push(tab.path)
  }

  //tab删除事件
  const handleTabRemove = (targetKey: string | React.MouseEvent<HTMLElement>, action: 'add' | 'remove') => {
    if (action === 'remove') {
      let tmpTabs: Array<ITab> = [...tabs]
      const index = tmpTabs.findIndex((item: ITab) => item.key === targetKey)
      tmpTabs.splice(index, 1)
      setTabs(tmpTabs)
      if (tmpTabs.length === 0) router.push('/')
      else router.push(tmpTabs[tmpTabs.length - 1].path)
    }
  }

  //右侧下拉菜单点击事件
  const handleSelectMenu = (param: ClickParam) => {
    if(param.key === '0'){
      setRefresh(false)
    }else if(param.key === '1'){
      const tmpTab : ITab | undefined = tabs.find((item:ITab) => item.key === activeKey)
      if(tmpTab) setTabs([tmpTab])
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible={true}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className='logo'>
          <h1 className={styles.title}>
            {collapsed ? 'XX' : 'XXXX'}
          </h1>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['2']}
          defaultOpenKeys={['1']}
          mode="inline"
          selectedKeys={menuKey}
        >
          {menuList.map((item: IMenuItem) => {
            if (item.children) {
              return (
                <SubMenu
                  key={item.id}
                  title={
                    <span>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                      </span>
                  }
                >
                  {item.children.map(item1 => {
                    return (
                      <Menu.Item key={item1.id}>
                        <Link to={`/${item.path}/${item1.path}`}>{item1.title}</Link>
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={item.id}>
                  <Icon type={item.icon}/>
                  <span>{item.title}</span>
                </Menu.Item>
              )
            }
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}/>
        <Content style={{ margin: '0 16px' }}>
          <Tabs
            hideAdd={true}
            type="editable-card"
            style={{ paddingTop: 17 }}
            tabBarExtraContent={
              <div className="tab-option">
                <Dropdown
                  trigger={['click']}
                  overlay={
                    <Menu onClick={handleSelectMenu}>
                      <Menu.Item key="0">重新加载</Menu.Item>
                      <Menu.Item key="1">关闭其他</Menu.Item>
                    </Menu>}
                >
                  <Button type="primary" size="small">
                    标签选项 <Icon type="down"/>
                  </Button>
                </Dropdown>
              </div>
            }
            activeKey={activeKey}
            onTabClick={handleTabClick}
            onEdit={handleTabRemove}
          >
            {tabs.map((tab: ITab) => (
              <Tabs.TabPane tab={tab.title} key={tab.key}/>
            ))}
          </Tabs>
          <div
            style={{
              padding: 24,
              background: '#fff',
              height: 705,
              overflowY: 'auto',
            }}
          >
            {refresh && <Fragment>
              {props.children}
            </Fragment>}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
