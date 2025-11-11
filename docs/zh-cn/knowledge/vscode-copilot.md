---
title: Vscode Copilot
outline: [2, 3]
---

# vscode copilot结合figma使用总结

## copilot三种工作模式

**Ask：** 问答与解释，读仓库/文档，默认不改代码。<br> **Edit：** 按你的指令生成并展示改动（diff），你审核后再落盘。<br> **Agent：** 多步自动化执行任务，读写代码并可运行命令/工具，持续迭代直到达成目标。

## 使用figma mcp服务器

[多种添加方式教程地址](https://m.runoob.com/vscode/vscode-mcp-servers.html)

### 在当前工作目录添加Figma remote mcp服务器

1. 在你的工作区文件夹中创建 `.vscode/mcp.json`（没有 `.vscode` 目录就创建它） 文件，填入以下配置（[figma mcp local/remote配置教程](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/#vs-code)）:

官方文档配置

```json
{
    "inputs": [],
    "servers": {
        "figma": {
            "url": "https://mcp.figma.com/mcp",
            "type": "http"
        }
    }
}
```

copilot推荐配置（推荐）

```json
{
    "inputs": [
        {
            "type": "env",
            "name": "FIGMA_PERSONAL_ACCESS_TOKEN",
            "description": "Figma PAT with file read scope"
        }
    ],
    "servers": {
        "figma": {
            "url": "https://mcp.figma.com/mcp",
            "type": "http",
            "defaultHeaders": {
                "Authorization": "Bearer ${FIGMA_PERSONAL_ACCESS_TOKEN}"
            }
        }
    }
}
```

2. 配置完成后，依照提示，完成`figma mcp`服务授权登录
3. 选中设计稿，右键选择`copy link to selection`，输入`copilot`对话框使用![figma设计稿](./vscode-copilot/figma设计稿.png)
   
## copilot创建html项目

1. 设计稿
![alt text](image-1.png)
2. 首次创建时间约5分钟，还原度约70%
![alt text](image.png)
3. 二次对话，对话内容：“与设计稿中图标差异很大啊，请严格采用设计稿中的图标”，执行约三分钟，还原图标，整体还原度接近90%
   ![alt text](image-2.png)
## copilot创建vue项目

### 创建项目

1. 首次创建项目需要约定技术栈，在`ai-config.md`输入以下内容，并告之`copilot`使用该技术栈。之后对话，`copilot`会自动识别项目中使用到的技术栈，无需重复告知 ![技术栈说明.md](./vscode-copilot/技术栈说明.png)

2. 选择`agent`模式，输入以下聊天内容，按照提示，在聊天界面持续接受`copilot`发起的各种命令（运行cmd、创建文件、合并代码等），整个过程`30min`左右，即可从0到1生成一个当前生产项目可以的前端工程，粗略统计生成了`24个文件，1.1万多行代码`

    _“/https://www.figma.com/design/SdLHNcEYWK6bqqEIHw6tkP/Admin-Panel--Internal-Management-Tool--Community-?node-id=233-3631&t=qR4UzUHai0WvwdiX-4 按照ai-config.md中的技术栈，实现设计稿中的页面”_

3. copilot连接figma设计稿 ![alt text](./vscode-copilot/colipot连接figma效果.png)
4. 期间`copilot`多次执行`npm run build`命令，通过获取控制台信息，自动进行代码修正，直到npm run build不再报错，花费时间约`30min`![构建记录](./vscode-copilot/构建记录.png)

### 运行项目

1. 首次运行项目，项目构建`npm run dev`时启动不报错，但页面白屏无内容，打开控制台，报错如下,国际化相关错误，花费`3小时`解决。错误原因为VueI18nPlugin配置错误，混用了自动导入语言包和手动导入语言包

    ![i18n报错](./vscode-copilot/i18n报错.png)

```ts
///src/plugins/i18n.ts
import { createI18n } from 'vue-i18n'
import zhCN from '@/locales/zh-CN.json'
import enUS from '@/locales/en-US.json'

import messages from '@intlify/unplugin-vue-i18n/messages' //[!code --]
export function setupI18n() {
    return createI18n({
        legacy: false,
        locale: 'en-US',
        fallbackLocale: 'en-US',
        messages, //[!code --]
        messages: {
            'en-US': enUS,
            'zh-CN': zhCN,
        },
    })
}
//vite.config.ts
VueI18nPlugin({
    // include 用于指定需要被插件处理（预编译/打包）的本地化资源文件
    include: path.resolve(process.cwd(), 'src/locales/**'), //[!code --]
    runtimeOnly: false, //[!code --]
})
```

**github知名前端框架vue-vben-admin（30k星星）中导入语言包方案** ![vue-vben-admin中语言包导入](./vscode-copilot/vue-vben-admin-i18n.png)

2. 解决报错，进入系统，设计稿首次还原效果 ![ai首次构建系统效果](./vscode-copilot/ai首次构建系统效果.png)

### 调试项目

1. 告知ai布局错误，调整布局
2. 添加中英文切换事件
3. 添加新的菜单页面 
  
  [本次生成的测试项目地址](https://github.com/MusiCoder32/admin-by-ai)
  ![alt text](./vscode-copilot/大屏英文.png) ![alt text](./vscode-copilot/people页面.png)
