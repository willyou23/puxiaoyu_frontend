# puxiaoyu_frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration


## frontend

创建vue project

vue version:@vue/cli 4.5.12

```
vue create puxiaoyu_frontend
manually
babel+router+2.x
no
package.json
no
```

```
npm run serve
```

安装element-ui

```
npm i element-ui -S
```

完整引入elemet-ui    ---------在main.js

```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```

安装axios

```
npm install axios --save
```

引入axios

```
import axios from "axios";
Vue.prototype.$axios = axios
```

设置跨域

加入vue.config.js

安装qs

```
npm install qs
```

