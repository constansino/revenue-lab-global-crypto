# Revenue Lab 2026-03-18

这是一个全新创建的最小盈利项目，不依赖你本机现有代码库。

## 这是什么

一个可直接上线的静态销售页，定位为 `AI 自动化冲刺服务`：

- 卖服务，而不是空泛卖 AI
- 默认展示你的链上收款地址
- 自带三档报价
- 自带 ROI 估算器
- 自带外联脚本

## 为什么选这个方向

- Upwork 官方 2025 数据显示 AI 与自动化相关技能仍处于增长区间，适合以项目制服务切入。
- GitHub Pages 和 Vercel 都可以直接部署静态站，启动非常快。
- 收款先走链上订金最简单，后续再补卡支付或 Stripe 稳定币。

## 文件

- `index.html`: 页面结构
- `local-services.html`: 面向本地高客单服务商的垂直版本
- `pay.html`: 面向全球客户的加密支付页
- `crypto-native.html`: 面向全球加密原生客户的英文页
- `styles.css`: 页面视觉
- `app.js`: 钱包复制和 ROI 估算器
- `PLAYBOOK.md`: 第一周外联执行方案
- `leads.csv`: 线索表模板
- `sample-leads.csv`: 线索填写示例
- `generate-outreach.mjs`: 根据线索表生成 DM / 邮件
- `audit-leads.mjs`: 抓取目标站点并生成问题观察点
- `post-to-discourse.mjs`: 把本次更新发布到 Discourse 主题或新帖子
- `discourse-post-template.md`: Discourse 发布模板
- `github-demand-research-20260319.md`: 本轮 GitHub 需求调研结论
- `github-demand-research-20260319.html`: 公开访问版调研页
- `docsafe-flow.html`: 基于调研结果收敛出的文档工作流 MVP 公共页
- `docsafe-roi-calculator.html`: DocSafe 的交互式 ROI 估算小工具页
- `docsafe-stack-picker.html`: 基于 GitHub 活跃项目做的 DocSafe 文档工作流选型小工具页
- `docsafe-scope-builder.html`: 把真实工作流痛点转成 phase-one 实施 brief 的 DocSafe 交互式 scope 小工具页
- `docsafe-approval-planner.html`: 把 approver / signer / CC / 提醒顺序转成审批路径 brief 的 DocSafe 交互式小工具页
- `docsafe-send-router.html`: DocSafe 的买家路由与发送顺序页
- `docsafe-reply-board.html`: DocSafe 的回复分类与下一步发送页
- `docsafe-close-board.html`: DocSafe 的成交锁 scope 与订金推进页
- `docsafe-audit-start.html`: DocSafe 的买家可直接付款启动的 audit 起始页
- `docsafe-audit-intake.html`: DocSafe 的收款后材料提交与启动页
- `docsafe-audit-delivery.html`: DocSafe 的 audit 交付与升级路径页
- `docsafe-setup-sprint-start.html`: DocSafe 的 $900 setup sprint 起始页
- `docsafe-setup-sprint-intake.html`: DocSafe 的 $900 sprint 收款后 brief 锁定页
- `docsafe-workspace-start.html`: DocSafe 的 $2,000 white-label workspace 起始页
- `docsafe-workspace-intake.html`: DocSafe 的 $2,000 workspace 收款后启动页
- `docsafe-workspace-delivery.html`: DocSafe 的 $2,000 workspace 交付与续接页
- `docsafe-ops-retainer-start.html`: DocSafe 的月度运营 retainer 起始页
- `docsafe-ops-retainer-intake.html`: DocSafe 的月度 retainer 收款后启动页
- `docsafe-ops-monthly-report.html`: DocSafe 的月度 retainer 月报与续费支撑页
- `docsafe-ops-renewal.html`: DocSafe 的月度 retainer 续费页
- `docsafe-roi.js`: DocSafe ROI 小工具的交互逻辑
- `docsafe-stack-picker.js`: DocSafe 选型小工具的交互逻辑
- `docsafe-scope-builder.js`: DocSafe scope 小工具的交互逻辑
- `docsafe-approval-planner.js`: DocSafe 审批路径小工具的交互逻辑
- `docsafe-agency-client-ops.html`: 面向 agency account / client ops 的垂直版公开页
- `docsafe-legal-signing-ops.html`: 面向 legal / signing ops 的垂直版公开页
- `docsafe-recruiting-onboarding-ops.html`: 面向 recruiting / onboarding ops 的垂直版公开页
- `proposal-template.md`: 可直接发送的简版报价模板
- `global-crypto-profit-map.md`: 全球获客和链上收款路径
- `global-posts.md`: 可直接发到全球平台的帖子和私信模板
- `live-links.md`: 已上线公开网址
- `global-prospects.csv`: 全球潜在客户记录模板
- `global-prospecting-playbook.md`: 全球冷启动筛选和私信规则
- `top5-custom-outreach.md`: 最优先 5 个目标的定制私信和邮件
- `top5-priority.csv`: 当前最优先外联顺序
- `top5-followups.md`: 最优先 5 个目标的第二轮跟进和异议回复
- `top5-teardowns.md`: 对方回复后可直接发送的 3 点 mini teardown
- `wave3-top3-custom-outreach.md`: 第三波里最优先 3 个 crypto-native 目标的定制外联
- `wave3-top3-priority.csv`: 第三波最优先 3 个目标顺序
- `wave3-remaining-custom-outreach.md`: 第三波剩余 2 个目标的定制外联
- `wave3-full-priority.csv`: 第三波 5 个目标完整优先顺序
- `wave3-reply-closers.md`: 第三波 5 个目标回复后的承接句和 closing
- `wave3-send-order.md`: 第三波 5 个目标的发送节奏
- `wave4-top3-custom-outreach.md`: 第四波里最优先 3 个目标的定制外联
- `wave4-top3-priority.csv`: 第四波最优先 3 个目标顺序
- `wave4-reply-closers.md`: 第四波 3 个目标回复后的承接句和 closing
- `wave4-send-order.md`: 第四波 3 个目标的发送节奏
- `today-send-list.md`: 当前最强 6 个目标的即发清单
- `today-checklist.csv`: 今日发送和回复跟踪表
- `today-dm-pack.md`: 今天最强 6 个目标的可直接复制私信
- `today-followup-pack.md`: 今天最强 6 个目标的无回复跟进文案
- `wave5-top3-custom-outreach.md`: 第五波里最优先 3 个 agency / service 目标的定制外联
- `wave5-top3-priority.csv`: 第五波最优先 3 个目标顺序
- `wave5-reply-closers.md`: 第五波 3 个目标回复后的承接句和 closing
- `wave5-send-order.md`: 第五波 3 个目标的发送节奏
- `master-battle-order.md`: 三条主线的总作战顺序
- `master-priority.csv`: 当前总优先级表
- `batch1-dm-pack.md`: 总优先级前 3 个目标的可直接复制私信
- `batch1-followup-pack.md`: 总优先级前 3 个目标的无回复跟进
- `batch1-closers.md`: 总优先级前 3 个目标的回复承接和 closing
- `batch2-dm-pack.md`: 总优先级第 4-6 个目标的可直接复制私信
- `batch2-followup-pack.md`: 总优先级第 4-6 个目标的无回复跟进
- `batch2-closers.md`: 总优先级第 4-6 个目标的回复承接和 closing
- `batch3-dm-pack.md`: 总优先级第 7-9 个目标的可直接复制私信
- `batch3-followup-pack.md`: 总优先级第 7-9 个目标的无回复跟进
- `batch3-closers.md`: 总优先级第 7-9 个目标的回复承接和 closing
- `master-send-pack.md`: 前三批 9 个目标合并后的单文件总发送包
- `master-send-checklist.csv`: 前三批 9 个目标的总跟踪表
- `reply-matrix.md`: 常见回复类型的标准回法
- `live-reply-checklist.md`: 收到回复后的现场执行顺序
- `deal-advance-pack.md`: 从有兴趣推进到明确 scope 的短消息模板
- `deposit-request-pack.md`: 对方同意后直接要订金的模板
- `ops-dashboard.html`: 本地外联执行控制台
- `ops-dashboard.js`: 控制台逻辑和本地状态存储

## 立即预览

```bash
cd /Users/macbookm1air8g/revenue-lab-20260318
python3 -m http.server 4321
```

然后打开 `http://localhost:4321`

本地垂直页地址：

- `http://localhost:4321/local-services.html`

## 批量生成外联文案

先在 `leads.csv` 填入线索，然后执行：

```bash
cd /Users/macbookm1air8g/revenue-lab-20260318
node generate-outreach.mjs
```

输出文件会写到 `outreach-output.txt`

## 自动生成站点审计

把目标网址填进 `leads.csv` 后执行：

```bash
cd /Users/macbookm1air8g/revenue-lab-20260318
node audit-leads.mjs
```

输出文件会写到 `lead-audits.md`

如果你要先看格式，可以参考 `sample-leads.csv`

## 发布到 Discourse

先准备一个正文文件，默认可直接改 `discourse-post-template.md`，然后设置环境变量：

```bash
export DISCOURSE_BASE_URL="https://your-forum.example"
export DISCOURSE_API_KEY="your_api_key"
export DISCOURSE_API_USERNAME="system"
export DISCOURSE_TOPIC_ID="123"
```

回帖到已有主题：

```bash
cd /Users/macbookm1air8g/revenue-lab-20260318
node post-to-discourse.mjs discourse-post-template.md
```

如果要先看预览而不发帖：

```bash
cd /Users/macbookm1air8g/revenue-lab-20260318
node post-to-discourse.mjs discourse-post-template.md --dry-run
```

如果要新建主题而不是回帖：

```bash
cd /Users/macbookm1air8g/revenue-lab-20260318
export DISCOURSE_CATEGORY_ID="5"
node post-to-discourse.mjs discourse-post-template.md --title "Revenue Lab Update"
```

## 立即部署

### GitHub Pages

1. 新建一个公开仓库。
2. 把本目录内容推上去。
3. 在仓库设置里启用 GitHub Pages。

### Vercel

1. 安装 CLI: `npm i -g vercel`
2. 进入目录执行: `vercel`
3. 按提示完成首次绑定

## 第一批外联对象

优先找这三类：

1. 手工报价的本地服务商
2. 线索回复慢的跨境独立站卖家
3. 内容团队或小 agency

如果要先冲第一单，优先做第 1 类，因为单条线索价值更高，回复慢的问题也更直观。

## 建议动作

1. 先用这个页面跑 30 个精准外联，不要泛发垃圾消息。
2. 第一单只卖 `$299` 或 `$799`，目标是出案例，不是拉满客单价。
3. 同一类需求成交 3 次后，再把其中重复交付抽成模板或小 SaaS。

## 可自行替换的内容

- 品牌名 `Signal Foundry`
- 外联文案
- 三档报价
- 钱包地址
- 目标客群
