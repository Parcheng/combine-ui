window.config = {};
window.config.info = [
    "<h2>○ 使用方式：</h2>",
    "Page配置文件：由多个 Part 或 Module 组成",
    "{",
    "    id: \"domID\",     【 设置将生成的 HTML 插入到的 DOM 元素 ID 】",
    "    isBody: \"false\",     【 是否直接生成到<body></body>中，当id为空时此值变为true 】",
    "    before: \"function(){....}\",     【 DOM 加载之前要执行的初始化函数 】",
    "    init: \"function(){....}\",     【 DOM 加载完成是执行的初始化函数，一般在此函数中执行请求数据函数（load函数） 】",
    "    children: [    【 Part 和 Module 配置对象数组 】",
    "        { ",
    "            type: \"part.form\",     【 配置文件类型。表示 Part 的 Form 类型，支持所有的 Part 和 Module 】",
    "            config: {...}     【 配置对象内容 】",
    "        },{ ",
    "            type: \"module.table\",     【 配置文件类型。表示 Module 的 Table 类型，支持所有的 Part 和 Module 】",
    "            config: {...}     【 配置对象内容 】",
    "        }, ",
    "        ...... ",
    "    ]",
    "};",
    "ui.page.build(conf);    【 将配置文件构建为 HTML 代码直接写入指定 DOM 中 】"
];

window.config.fns = {
    header: { t1: "名称", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "build", t2: "ui.page.build(config);", t3: "配置对象", t4: "无", t5: "根据配置将HTML代码写入指定DOM元素" }
    ]
};

window.config.demos = undefined;

