# wx
- ######首先导包，linux使用控制台,cd到项目根目录，执行npm install，window在项目文件夹中打开cmd执行npm install
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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### 容器启动命令
```docker
windows： docker run -p 8008:80 -d --name wx -v //f/VuePOJO/wx/nginx:/etc/nginx/conf.d -v //f/VuePOJO/wx/dist:/usr/share/nginx/html  nginx
Linux： docker run -p 8008:80 -d --name wx -v $PWD/nginx:/etc/nginx/conf.d -v $PWD/dist:/usr/share/nginx/html  nginx
```