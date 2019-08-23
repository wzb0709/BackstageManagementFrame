export interface IMenuItem{
  title:string
  icon?:string
  id:number
  path:string
  children:Array<IMenuItem>
  auth?:number
}



export const menuList:Array<IMenuItem> = [
  {
    title: '菜单主标题',
    icon:'appstore',
    id:1,
    path:'main',
    children: [{
      title: '菜单副标题1',
      children: [],
      id:2,
      path:'list',
    }],
  },
  {
    title: '菜单主标题',
    icon:'appstore',
    id:3,
    path:'sub',
    children: [{
      title: '菜单副标题2',
      children: [],
      id:4,
      path:'list',
    }],
  },
]
