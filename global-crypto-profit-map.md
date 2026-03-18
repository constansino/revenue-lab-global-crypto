# Global Crypto Profit Map

目标不是依赖单一平台，而是：

1. 用你自己的页面成交
2. 用全球平台导流
3. 用钱包直接收订金或全款

## 主路径：自有页面 + 直接钱包收款

### 你已经有的本地页面

- 通用页: `index.html`
- 本地服务商页: `local-services.html`
- 支付页: `pay.html`

### 推荐部署入口

- GitHub Pages: https://docs.github.com/pages/quickstart
- Vercel: https://vercel.com/docs/deployments

### 为什么这是主路径

- 不受平台托管支付规则限制
- 可以直接展示钱包地址
- 适合卖服务、模板、定制交付

## 全球获客入口

这些平台适合导流，不适合把收款命脉交出去。

- Hacker News: https://news.ycombinator.com/
- Indie Hackers: https://www.indiehackers.com/
- Product Hunt: https://www.producthunt.com/
- Farcaster: https://farcaster.xyz/

## 加密支付基础设施

### 1. 最简单

直接展示钱包地址，收 USDC 或 ETH。

适合：

- 定制服务
- 订金
- 模板包
- 咨询

### 2. 更像正规结账页

- Coinbase Payment Links API: https://docs.cdp.coinbase.com/coinbase-business/payment-link-apis/overview
- Coinbase create payment link API: https://docs.cdp.coinbase.com/api-reference/payment-acceptance/payment-links/create-payment-link

适合：

- 发单独的支付链接
- 每个客户单独生成订单
- 后续接 webhook 做自动确认

### 3. 最强控制权

- BTCPay Server guide: https://docs.btcpayserver.org/Guide/
- BTCPay Docker install: https://docs.btcpayserver.org/Docker/

适合：

- 自建支付网关
- 不想依赖托管收款方
- 后续卖数字产品和订阅

### 4. 以后再考虑

- Stripe stablecoin payments: https://docs.stripe.com/crypto/stablecoin-payments

限制：

- 截至我核实到的文档，当前只有美国企业可作为接收方启用稳定币收款。
- 所以这不是你现在的主路径。

## 最适合你马上卖的东西

### 服务

- AI automation sprint
- outbound page + outreach kit
- workflow teardown
- crypto-native landing page setup

### 数字产品

- outreach templates
- landing page templates
- audit playbooks
- niche-specific SOP bundles

## 推荐动作顺序

1. 先部署自己的页面。
2. 在页面里放清楚的钱包和订金规则。
3. 在 Indie Hackers、Farcaster、Hacker News 上发案例和拆解。
4. 用 Product Hunt 作为补充曝光，而不是唯一启动方式。
5. 后面如果订单稳定，再接 Coinbase Payment Links 或 BTCPay。

## 直接可用的网址

- 通用获客: `你的域名/`
- 垂直页: `你的域名/local-services.html`
- 收款页: `你的域名/pay.html`
