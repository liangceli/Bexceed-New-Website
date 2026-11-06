# 给主 Chat 的完整视频交接 Prompt

请接手 Bexceed 新网站的两支视频制作。Google Flow 已由我在主 Chat 旁边的内置浏览器标签页打开；请先检查主 Chat 能否访问该标签页、是否登录、实际可用模型与免费额度。side chat 的浏览器清单为空，并返回 `Browser is not available: iab`；这只证明 side chat 当时不能访问，不代表主 Chat 也不能访问，也不要把页面已打开理解成已经核实登录或余额。

项目根目录：`C:/Users/liangceli/Bexceed-New-Website`。

## 任务范围与协作

你负责真正的动态视频生成、逐镜头检查、本地剪辑压缩、视频 poster、网站视频替换与响应式验证。side chat 继续负责人物规范、四页静态 hero 概念图、单排 logos，以及这些部分的预览和验证。

这是同一个本地工作区。先看 `git status` 和相关 diff，保留所有已有修改；不要 reset/clean、切分支或覆盖文件恢复旧版本。尤其不要重写 `src/credentials.js`、`src/credentials.css`、`src/credential-carousel.js`。`src/main.js` 已加入 carousel 初始化与清理、`team-media.css` 样式入口，修改视频逻辑时只做必要的局部修改。四页 hero 图已由我在 side chat 确认，side chat 正负责本地替换，涉及 `src/pages.js`、`src/team-media.css`、`src/page-assets.json` 及 `public/assets/pages/*-team-hero*`；不要借此次视频任务改动这些内容。

这次使用 Google Flow 免费额度。不要使用 Runway 生成，不购买套餐、积分，不启用付费 API 或自动充值。先按页面真实显示确认模型、单次费用、时长及生成数量；不要照搬之前聊天中的价格估算。先只生成一个镜头，检查合格后再继续，每次只生成一个版本，不同时批量抽多个候选。免费额度耗尽时保存进度并明确告知，不自行付费，也不要承诺零废片。

## 必须复用的现有素材

所有文件已存在于：
`C:/Users/liangceli/Bexceed-New-Website/design/team-media-2026-11-06/`

先读、再看：
- `cast-reference.png`：四位虚构视觉角色的唯一人物母版；不要另造四张脸。
- `video-production.md`：两支视频的分镜和节奏。
- `prompts-and-status.json`：完整原始图像 prompts 和素材状态。
- `C:/Users/liangceli/Bexceed-New-Website/docs/media-style-guide.md`：人物与客户场景全局规范。

五张已经生成的分镜首帧：
1. `hero-01-family-meeting.png`
2. `hero-02-shop-visit.png`
3. `hero-03-daily-bookkeeping.png`（已经修正电脑背面不合理的图表，请使用当前文件）
4. `adviser-01-preparation.png`
5. `adviser-02-follow-up.png`

这五张现在只是静态图片，还没有生成对应视频。允许将这些虚构角色图片上传到 Google Flow 用于本次图生视频；不要上传客户资料、账目或无关项目文件。

## 固定人物与画面风格

A：华人女性，约 39 岁，侧分及肩深棕发、椭圆脸；深蓝软西装配米白衬衫，温和干练。
B：白人男性，约 44 岁，短棕发、鬓角略灰、整齐短胡茬；浅蓝开领 Oxford 衬衫，亲切稳重。
C：微胖亚洲男性，约 38 岁，圆脸、短黑发、深色眼镜；灰蓝衬衫配炭灰针织，保留其较丰满体型。
D：戴头巾的马来西亚马来族女性，约 35 岁；灰蓝／灰青色头巾、米白长袖配深蓝外套，端庄亲切。

外貌以母版和当前首帧为准。衣服可在固定风格内变化，不能更换面孔、发型、体型、眼镜或头巾身份。不要把虚构形象标注为真实、有姓名的公司员工。

客户围绕多元背景家庭和小生意，可有三代家庭、混合族裔夫妻与孩子。环境是普通办公室、社区小店、花店、家庭经营场所；自然肤质、自然光、克制动作。避免豪华董事会议室、夸张商务摆拍、磨皮塑料脸、浮动图表、生成的品牌文字。顾问只能来自 A/B/C/D；客户是独立角色。

## 视频一：首页 Hero，约 10 秒，三个场景

场景一，成片约 0–3.5 秒：A 与 D 和三代家庭在普通办公室讨论家庭烘焙店经营。白人祖父、亚裔祖母、混血成年女儿、印度裔丈夫和孩子。A 轻轻解释纸面图表，D 倾听，孩子安静画画。温和轻推镜头，不让七人同时做大动作。
首帧：`hero-01-family-meeting.png`。

场景二，成片约 3.5–6.7 秒：B 与 C 到多元背景夫妻经营的社区果蔬店，站着了解实际经营。店主说话时有一个小手势，顾问倾听；可轻微侧移。保留货架、蔬果、收银台等真实小生意元素。
首帧：`hero-02-shop-visit.png`。

场景三，成片约 6.7–10 秒：A 帮家庭花店店主核对收据和电脑记录，另一位家人在后方包花。一个简单指向或点头即可；电脑、单据和花束保持稳定。
首帧：`hero-03-daily-bookkeeping.png`。

## 视频二：Why Bexceed，约 6 秒，两个场景

对应 “Your goals. Our personal commitment.”。内容不与首页的会谈、到店、收据场景重复。

场景一，成片约 0–3 秒：C 与 D 在自己的工作桌前准备客户行动清单。C 轻敲键盘，D 核对一项内容，体现认真准备与实际建议。只有两位顾问，没有客户。
首帧：`adviser-01-preparation.png`。

场景二，成片约 3–6 秒：B 在普通办公室窗边打跟进电话，拿着方案，听完后轻点头。不要做成视频会议、呼叫中心或又一次客户会谈。
首帧：`adviser-02-follow-up.png`。

## Flow 生成方法

优先首帧图生视频，将对应首帧作为画面依据；如果所选模型支持人物参考，可同时引用母版。先检查首帧实际构图后再写动作指令，不要求画面中不存在的物件或动作。原有图像 prompt 仅作内容参考，不要直接把重画整幅图的长 prompt 原样当成视频动作 prompt。

优先测试 `adviser-01-preparation.png`，只有两人，便于低成本验证脸部、手部及自然动作。选取该账户免费可用且支持参考图片的合适模型，4–6 秒即可；若同价可选 6 秒，留出剪辑余量。横屏 16:9，一次一个结果。网站无声播放，不需要生成配音、背景音乐或精确口型。

通用英文约束可采用：

“Animate the supplied image as the first frame. Preserve the exact identities, facial structure, age, body proportions, hair, glasses, hijab, clothing, people count and room layout. Natural restrained human movement at normal speed, subtle breathing and blinking, stable hands and objects, realistic documentary footage. Only a gentle camera movement, if any. Do not add people, new text, logos, graphics or transitions. No face morphing, exaggerated gestures, rapid camera motion or staged smiles.”

再为每个镜头补充一个具体的小动作。若工具没有负向提示词栏，把必要限制简短写进主 prompt，不猜测不存在的参数。

## 检查、剪辑与接入

1. 每个生成结果查看起始、中间、结尾及实际运动；核对 A/B/C/D 面孔、C 的体型、D 的头巾，以及手部、手机、电脑和单据。不能只看到任务成功就认为视频合格。
2. 合格镜头下载到新的独立目录，例如 `design/team-media-2026-11-06/flow-video/`；记录模型、prompt、任务标识、时长、实际积分、结果与检查结论。不要覆写静态首帧。
3. 本地剪成约 10 秒首页、约 6 秒介绍片。使用短叠化或自然切镜，不把转场交给生成模型浪费额度。不用静态图片平移冒充真人动作视频。
4. 输出静音 H.264、yuv420p、faststart，以及 poster。保留剪辑母版。按网站原视频尺寸评估 1920×800 首页和 1280×720 介绍片；源素材若只有 720p，说明真实清晰度，不把放大包装成原生 1080p。
5. 接入前检查现有引用：`public/assets/hero-meeting.mp4`、`public/assets/adviser-consultation.mp4`，以及 `src/home.js`、`src/main.js` 中视频与 poster 逻辑。保留现有静音循环、playsinline、首帧回退、视口暂停和减少动态效果行为。
6. 在 320、390、768、1440、1920px 检查人物取景、标题遮挡、视频加载、移动端自动播放与循环。需要时制作移动端独立裁切；不要粗暴中心裁切掉顾问。
7. 完成后展示两支真实成片，报告使用积分、实际分辨率、替换文件、检查结果和任何未完成项。GitHub 推送或部署沿用我在主对话明确给过的授权；本交接本身不新增购买、推送或上线授权。

请直接从检查已打开的 Flow 标签页和阅读现有素材开始，不要重新创建人物或重复出整套分镜。
