window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"screen_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等，默认自动生成随机字符串 】",
    "show: true,    【 值被选中是否显示在上方，默认true 】",
    "style: \"...\",    【 自定义样式，可选值：CSS格式样式 】",
    "groups: [    【 筛选条件配置对象数组 】 ",
    "    {",
    "        key: \"xh\",    【 筛选条件Key，调用getData()时作为属性名返回该group中被选中的item数组 】",
    "        title: \"电脑型号\"    【 筛选条件文本描述 】",
    "        items: [    【 筛选条件可选值列表 】",
    "            {    【 筛选条件可选值配置对象 】",
    "                key: \"hp\",    【 实际值 】",
    "                text: \"惠普\",    【 值的页面显示文本 】",
    "            },",
    "            ......",
    "        ]",
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
    "var partObj = ui.part.screen.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.screen.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的窗口配置参数"},
        { t1: "getData", t2: "ui.parts.screen.getData(id);", t3: "ID", t4: "无", t5: "获取所有被选中的值，对象结构：{ groupKey:[{key:itemKey, text:itemText},...], ... }"},
        { t1: "check", t2: "ui.parts.screen.item.check(id, groupKey, itemKey);", t3: "ID，Group对象Key，Item对象Key", t4: "无", t5: "选中一个值"},
        { t1: "delete", t2: "ui.parts.screen.item.delete(id, groupKey, itemKey);", t3: "ID，Group对象Key，Item对象Key", t4: "无", t5: "删除一个被选中的值"},
        { t1: "move", t2: "ui.parts.screen.item.move(id, groupKey, itemKey);", t3: "ID，Group对象Key，Item对象Key", t4: "无", t5: "移动一个被选中的值"}
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 500,
    config: {
        id: "screen_demo_0",
        groups: [{
            key: "xh",
            title: "型号",
            items:[{
                key: "hp",
                text: "惠普"
            },{
                key: "dell",
                text: "戴尔"
            },{
                key: "mate",
                text: "华为"
            },{
                key: "m",
                text: "小米"
            }]
        }, {
            key: "clq",
            title: "处理器",
            items:[{
                key: "i3",
                text: "酷睿i3"
            },{
                key: "i5",
                text: "酷睿i5"
            },{
                key: "i7",
                text: "酷睿i7"
            }]
        }]
    }
}];
