export default {
  'GET /api/product':(req:any,res:any) => {
    setTimeout(() => {
      res.send([
        {title:'标题1',id:1,description:'描述1'},
        {title:'标题2',id:2,description:'描述2'},
        {title:'标题3',id:3,description:'描述3'},
        {title:'标题4',id:4,description:'描述4'},
        {title:'标题5',id:5,description:'描述5'},
        {title:'标题6',id:6,description:'描述6'},
        {title:'标题7',id:7,description:'描述7'},
      ])
    },2000)
  },
}
