#请详细阅读该文档
代码也是产品的一种，保持良好的编程规范有利于自己和他人阅读

#FLOW 配置
flow 是 facebook 推出的静态类型检查工具，有利于排除因为变量未定义、null、类型转换隐患，提高应用的安全建议安装 flow 插件
vscode 中安装 Flow Language Support

#文件头注释
文件头注释插件：Vscode-fileheader,文件头注释。默认快捷键 control + option + I。
配置 vscode 设置，如果设置准备应用所有的项目则在用户设置中配置下面参数，否则在工作区设置就好，其中 fileheader.Author，fileheader.LastModifiedBy 设置自己的名字
{
// By default, create file username
"fileheader.Author": "Jone.Lin",
// By default, update file username.
"fileheader.LastModifiedBy": "Jone.Lin",

"fileheader.tpl": "/_\r\n _ Copyright (c) 2018-present, 网信智投, Inc. \r\n _ \r\n _ @Author: {author} \r\n _ @Date: {createTime} \r\n _ @Last Modified by: {lastModifiedBy} \r\n _ @Last Modified time: {updateTime} \r\n _ @Note \r\n \*/\r\n"
}

#命名规则
文件命名规则，js 文件小驼峰命名
资源命名规则：小写+-方式命名，
类命名规则：大驼峰命名规则
函数、变量命名规则：小驼峰命名规则

#目录结构
api:接口文件
asset:资源文件夹
commom:公共文件夹
config:包含配置文件和全局函数定义
event:事件文件夹
net:网络定义
redux:redux 配置和 actions 类型定义
router:路由文件夹，包含路由配置和路由定义
utils:工具文件夹，常用工具放在这里
views:业务页面文件夹

#页面创建规则
1、在 views 文件夹中创建子文件夹，包含 Page.js、PageRedux.js、Page.scss、PageActions.js
2、在 router/routeName 中定义路由名称
3、在 router/routes 中配置路由
4、在 redux/reducers 中配置 redux
5、在 pageActions 中定义 action
6、在 pageRedux 中定义 action 处理结果
7、可以写页面逻辑了

#导航跳转
1、可以通过调用父类 push 方法进行跳转
2、通过 react-router-redux 的 push action 跳转

#网络
目前网络中包含 http 请求，请求/返回格式为 json 格式，于后端通信接口定义在 src/api 目录下,具体用法可以参考模板
注：不要因为省事，把后端返回的数据直接动态的添加到未定义的状态或属性中。原因会形成后端数据依赖，在数据兼容性上会有隐患。如：后端返回数据 data = { template:10} this.state.temp = data 调用:this.state.temp.template 后果：如果有一天后端更改了返回字段为：data = { template_error:10} 前端则会直接报错，因为未定义 template 变量。

正确做法，先声明变量后在进行赋值。

#redux 派发多个 actions
使用 redux-batched-actions 插件
用法：参考 templateContentActions 中 actionTemplateBatch
/\*\*

- 分发多 actions 模板,使用 batchactions 进行多发 actions
-
- @returns
  \*/
  export const actionTemplateBatch = () => {
  return batchActions([actionTest, actionsTest2])
  }

#调试

#自动化测试

#FAQ
