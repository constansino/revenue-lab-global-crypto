# GitHub Demand Research 2026-03-19

公开页：
https://constansino.github.io/revenue-lab-global-crypto/github-demand-research-20260319.html

研究目标：
- 停止继续堆模板销售页。
- 从 GitHub 上找已经被验证有人持续使用、持续维护、持续付费的产品赛道。
- 选出一个更适合我们快速切入并尽快拿到首批付费用户的 MVP。

## 结论

当前最值得切入的方向不是再做宽泛的获客模板，也不是直接硬碰硬重做 `n8n` / `Stirling-PDF` 这种大套件。

最优切入点是：

`Secure client document intake + redaction + approval workspace`

中文可以理解为：

`面向跨境 agency / 法务 / 签约团队 / 咨询交付方的安全文档收集、脱敏、签批和交付台`

它本质上是从 PDF 工作流与电子签名两个大赛道里切一个更窄、但更容易卖的 wedge。

## 代表赛道与 GitHub 证据

### 1. PDF workflow / compliance

代表项目：
- https://github.com/Stirling-Tools/Stirling-PDF

2026-03-19 观察到的 GitHub 信号：
- 75.5k stars
- 342 issues
- 170 releases
- 最新 release 在 last week
- 最新 commit 为 yesterday

README 明确信号：
- browser UI
- self-hosted server
- private API
- sign / redact / OCR / convert / automate PDFs
- server plan & enterprise

为什么用户愿意付费：
- 涉及合同、证件、发票、报关、KYC、法务文档时，文件处理直接影响业务流程。
- 很多团队不愿把敏感 PDF 直接交给纯 SaaS 黑盒。
- 自托管、审计、批量处理、权限控制都天然能收费。

我们能切入的更小 MVP：
- 客户上传文件
- 自动分类
- 一键脱敏
- 生成“待签 / 待批 / 已交付”状态流
- 输出安全分享链接

### 2. E-sign / document approval

代表项目：
- https://github.com/documenso/documenso

2026-03-19 观察到的 GitHub 信号：
- 12.5k stars
- 166 issues
- 46 releases
- 最新 release 在 last week
- 最新 commit 为 11 hours ago

README 明确信号：
- Open Source DocuSign Alternative
- self-hosting
- 多种部署方式
- e-signature / document-signing / audit log / envelope

为什么用户愿意付费：
- 签约、审批、审计链条天然有预算。
- 一旦进入流程，切换成本高。
- 对可靠性、模板、组织权限和品牌定制有真实需求。

难点：
- 法务可信度和交付完整性要求更高。
- 如果直接做通用电子签，容易陷入与大厂正面竞争。

### 3. Feedback / survey / experience research

代表项目：
- https://github.com/formbricks/formbricks

2026-03-19 观察到的 GitHub 信号：
- 12k stars
- 204 issues
- 162 releases
- 最新 release 在 12 hours ago
- 最新 commit 为 10 hours ago

README / repo 明确信号：
- Open Source Qualtrics Alternative
- 核心功能开源
- Enterprise 版单独授权
- website survey / in-app survey / link survey

为什么用户愿意付费：
- 增长团队、产品团队、客户成功团队都需要持续收集反馈。
- 企业版权限、合规、白标、数据驻留都能收费。

难点：
- 用户留存依赖产品集成和团队协作，不是最容易冷启动成交的第一单。

### 4. Workflow automation / AI agent orchestration

代表项目：
- https://github.com/activepieces/activepieces
- https://github.com/n8n-io/n8n

2026-03-19 观察到的 GitHub 信号：

`activepieces`
- 21.3k stars
- 262 issues
- 311 releases
- 最新 release 在 last week
- 最新 commit 为 2 hours ago

`n8n`
- 180k stars
- 421 issues
- 561 releases
- 最新 release 在 12 hours ago
- 最新 commit 为 2 hours ago

README 明确信号：
- workflow automation
- AI capabilities
- self-host / cloud / enterprise
- 大量 integrations

为什么用户愿意付费：
- 自动化直接替代人工流程，ROI 讲得清。
- 企业会为连接器、权限、稳定性、审计买单。

为什么不适合作为我们第一切入点：
- 竞争极度拥挤。
- 用户预期是“平台级”能力，不是小工具。
- 第一版很难做出足够强的差异化。

## 赛道判断

### 最强真实需求

1. workflow automation
2. PDF workflow / compliance
3. e-sign
4. feedback / survey

### 最清晰变现

1. PDF workflow / compliance
2. e-sign
3. workflow automation
4. feedback / survey

### 最容易被大玩家压死

1. workflow automation
2. scheduling
3. 通用 e-sign

### 最适合我们做窄切口拿第一批付费用户

1. PDF + approval wedge
2. e-sign wedge
3. survey wedge
4. automation platform

## 推荐 MVP

产品名称先用工作名：

`DocSafe Flow`

目标用户：
- 跨境 agency
- 法务外包团队
- 顾问 / 咨询交付团队
- 招聘 / 人力外包
- 需要客户反复上传身份证明、合同、发票、授权书的团队

首版只做 5 件事：
- 安全上传入口
- PDF / image 自动归类
- 一键脱敏副本
- 待审批 / 待签 / 已交付状态看板
- 可分享交付页与链上付款说明

为什么这个 MVP 更合理：
- 比做整套 PDF 平台小很多。
- 比做通用电子签更容易切到具体场景。
- 能直接对接已有付费业务流程，不需要教育市场。
- 可以先卖服务化部署、定制字段、白标和私有托管。

## 最先卖给谁

第一批 buyer persona：
- 每月处理 30-300 份客户文件的小团队负责人
- 当前靠邮箱、微信、Telegram、Google Drive、手工重命名和催签推进流程
- 对“文件乱、版本乱、隐私风险、催交付麻烦”有痛感

一句话卖点：

`把客户文档收集、脱敏、审批、签回和交付从聊天记录里拉出来，变成一个可控的安全流程。`

## 变现模型

优先顺序：

1. Setup fee
- 帮客户落地专属 intake / approval workspace

2. Monthly subscription
- 按团队 / 项目数 / 月文件量收费

3. White-label / self-hosting
- 面向更在意品牌与隐私的客户

4. Premium workflow packs
- 不同行业的字段模板、审批模板、交付模板

## 下一步

下一轮应该做的不是继续铺模板页，而是：

1. 做一个真正的 `DocSafe Flow` 公共 MVP 页面
2. 明确 1 个垂直场景
3. 做最小可演示上传-脱敏-审批流程
4. 用 GitHub Pages 公开演示页
5. 把每轮更新同步发到 Discourse

## 钱包

0xB3e9568A9cbB624403743340358c85CCce130893
