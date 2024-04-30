window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"accordions_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等，默认自动生成随机字符串 】",
    "style: \"...\",    【 自定义样式，可选值：CSS格式样式 】",
    "items: [    【 手风琴配置对象数组 】",
    "    {",
    "        id: \"button_1\",    【 手风琴ID，默认自动生成随机字符串 】",
    "        show: false,    【 是否展开，默认false 】",
    "        title: {    【 标题配置对象 】",
    "            style: \"...\",    【 自定义样式，可选值：CSS格式样式 】",
    "            text: \"...\",    【 标题显示的文本内容，默认无 】",
    "        }",
    "        body: {    【 内容体配置对象 】",
    "            style: \"...\",    【 自定义样式，可选值：CSS格式样式 】",
    "            content: \"...\",    【 展开显示的内容 】",
    "        }",
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
    "var partObj = ui.part.accordions.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.accordions.getConfig(id);", t3: "手风琴组ID", t4: "配置参数对象", t5: "获得指定 ID 的窗口配置参数"},
        { t1: "switch", t2: "ui.parts.accordions.item.switch(id, itemId);", t3: "手风琴组ID，手风琴ID", t4: "无", t5: "展开/收起"}
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 250,
    config: {
        id: "accordions_demo_0",
        items: [{
            id: "accordion_1",
            title: {
                text: "标题-1"
            },
            body:{
                content: "内容 - 1"
            }
        }, {
            id: "accordion_2",
            title: {
                text: "标题-2"
            },
            body:{
                content: "内容 - 2"
            }
        }]
    }
}];
