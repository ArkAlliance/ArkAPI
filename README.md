![Banner](https://cdn.jsdelivr.net/gh/ArkAlliance/ArkAPI/docs/assets/banner.png)

## Intro 简介

ArkAPI 是由 [ArkAlliance](https://github.com/ArkAlliance) 发起的明日方舟资源公共 API，皆在为明日方舟工具站生态提供稳定、易于接入且面向用户体验优化的 API 服务。

ArkAPI 现处于早期开发阶段，欢迎创建 Issues 或/和 Pull Requests 与我们一起完善 ArkAPI。

## Guide 接入指南

ArkAPI 将提供两种 API 接入方式：**RESTful API** 和 **GraphQL API** ([什么是 GraphQL?](https://graphql.org))。

两种接入方式所提供的 API 服务内容均相同，但 GraphQL API 提供了更为强大的查询功能。

> 接入指南仍在建设中，敬请期待

## Development 开发与贡献指南

### Setup

- [Node.js](https://nodejs.org/) (>= 16)
  - 强烈建议使用 [nvm](https://github.com/nvm-sh/nvm) 进行 Node.js 版本管理；通过 nvm 可直接使用 `.nvmrc` 文件中的版本号安装 Node.js: `nvm install`
- **请注意：**项目使用 [npm](https://www.npmjs.com/) 进行依赖管理（而非 [yarn](https://yarnpkg.com/)）；不当使用包管理器可能导致项目依赖不一致，从而导致项目无法正常运行，因此请务必使用 npm 进行所有操作。

### Install

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License 协议

ArkAPI 源代码以 [AGPL-3.0](https://github.com/ArkAlliance/ArkAPI/blob/main/LICENSE) 开源。

ArkAPI 的服务内容以 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) 协议开放。

## Security Disclosure 安全漏洞披露

如果您发现了安全漏洞，请发送 E-mail 至 `me at galvingao dot com`，我们将尽快处理。ArkAPI 感谢您对其安全的关注，并希望您能遵守以下安全披露原则：

- 请不要在收到我们已修复漏洞的回复前公开披露安全漏洞；
- 请在安全漏洞报告中提供尽可能多的信息，例如漏洞的影响范围、复现步骤、漏洞的危害等；
- 请同时在安全漏洞报告中提供测试此漏洞时所使用的环境信息，例如 `User-Agent`、鉴权信息、IP 地址等，以便我们更快地定位问题。

## Contributing 贡献

ArkAPI 欢迎任何形式的贡献，包括但不限于：

- 提交目的明确、描述清晰的 Issues
- 提交 Pull Requests

## Credits 致谢

- [Kengxxiao/ArknightsGameData](https://github.com/Kengxxiao/ArknightsGameData) 提供 API 所需的原始数据
