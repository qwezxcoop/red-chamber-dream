# 红楼绘卷 | Red Chamber Dream

一个基于React和Three.js的《红楼梦》交互式3D体验项目，通过现代Web技术重新诠释经典文学作品。

## ✨ 项目特色

- 🌟 **沉浸式封面** - 发光粒子效果和动态背景
- 🌌 **星座角色选择** - 3D星体布局，展现角色关系
- 📖 **互动故事体验** - 流畅的动画转场和进度指示
- 🗺️ **命运关系图** - 可视化角色间的复杂关系网络
- ❄️ **粒子转场效果** - 雪花和碎片等多种转场动画

## 🚀 快速开始

### 环境要求

- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可体验。

### 构建生产版本

```bash
npm run build
```

## 🛠️ 技术栈

- **前端框架**: React 19
- **3D渲染**: Three.js + @react-three/fiber
- **3D工具**: @react-three/drei, @react-three/postprocessing  
- **动画**: @react-spring/three
- **构建工具**: Create React App

## 📁 项目结构

```
src/
├── components/           # 组件目录
│   ├── CoverScene.js    # 封面场景
│   ├── CharacterSelectionScene.js  # 角色选择
│   ├── CharacterStory.js           # 角色故事
│   ├── FateMapScene.js            # 命运地图
│   └── ...                       # 其他组件
├── data.js              # 角色和场景数据
├── App.js              # 主应用
└── index.js            # 入口文件
```

## 🎨 功能介绍

### 封面场景
- 动态粒子背景
- 发光文字效果
- 鼠标跟随交互

### 角色选择
- 3D星座布局
- 角色颜色预览
- 连接线动画

### 角色故事
- 自动/手动切换模式
- 进度指示器
- 右键菜单交互

### 命运地图
- 角色关系网络
- 交互式图例
- 动态连接线

## 📄 许可证

本项目仅供学习和研究使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

*"满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味？"*

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
