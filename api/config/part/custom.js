window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"custom_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "type: \"temp\",    【 自定义类型，可选值：iframe|include|temp 】",
    "content: \"....\",    【 内容。temp类型时填入HTML代码；include类型时填入引入HTML文件的URL 】",
    "properties: { height: \"300px\", src: \"https://www.csdn.net\" }    【 自定义元素的属性对象。仅在iframe类型时有效。 】",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.custom.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.custom.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "打开指定 ID 的自定义零件"}
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 400,
    config: {
        id: "custom_html_demo",
        type: "temp",
        content: "<h1>这是 temp 类型的内容！</h1>"
    }
}, {
    title: "iframe示例",
    height: 400,
    config: {
        id: "custom_iframe_demo",
        type: "iframe",
        properties: { height: "300px", src: "https://www.csdn.net" }
    }
}, {
    title: "include示例",
    height: 400,
    config: {
        id: "custom_include_demo",
        type: "include",
        content: "./data/test.html"
    }
}];
