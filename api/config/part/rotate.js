window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"rotate_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等，默认自动生成随机字符串 】",
    "show: 1,    【 默认显示第几张图 】",
    "width: 800,    【 图片宽度，最小值200，当小于该值200或未定义则默认置成200 】",
    "height: 400,    【 图片高度，最小值100，当小于该值200或未定义则默认置成200 】",
    "items: [    【 轮转图配置对象数组 】",
    "    {",
    "        img: \"...\",    【 图片地址 】",
    "        text: \"...\",    【 图片上显示的文字内容，支持HTML代码 】",
    "    }, ",
    "    ......",
    "]",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.rotate.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.accordions.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的窗口配置参数"},
        { t1: "check", t2: "ui.parts.accordions.checkh(id, index);", t3: "ID，索引", t4: "无", t5: "切换至指定的索引的内容"},
        { t1: "click", t2: "ui.parts.accordions.item.switch(id, index);", t3: "ID，索引", t4: "无", t5: "触发指定索引内容的单击事件"}
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 500,
    config: {
        id: "rotate_demo_0",
        width: 800,
        height: 400,
        items: [{
            img: "./img/2.jpg",
            text: "<h1 style='color:white;'>图片一</h1><p style='color:white;'>可以点击左侧/右侧的箭头，或下方小方格切换到图片二</p>"
        }, {
            img: "./img/1.jpg",
            text: "<h1 style='color:white;'>图片二</h1><p style='color:white;'>可以点击左侧/右侧的箭头，或下方小方格切换到图片二</p>"
        }]
    }
}];
