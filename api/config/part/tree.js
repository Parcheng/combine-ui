window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"tree_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "click: true,    【 是否支持点击事件，默认false 】",
    "style: \"...\",    【 自定义样式，可选值：CSS格式样式 】",
    "items: [    【 子项配置数据 】",
    "    { id: \"...\", text: \"...\", show: ..., items: [...] },    【 子项层级无限制 】",
    "    ......",
    "],",
    "call: ｛    【 事件回调函数对象，所有导航中优先级最低，对所有导航都生效 】",
    "    click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(){  ....  }      【 单击事件回调函数，可选值：函数|函数路径字符串。this对象：当前tree节点配置对象 】",
    "        params: {}      【 单击事件回调函数参数，可选值：所有类型 】",
    "    }",
    "}",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "items: Tree节点集对象，包含Tree所有节点配置对象，可通过 items.treeID 获得该Tree节点配置对象",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.tree.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.tree.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的导航条配置参数" },
        { t1: "setItems", t2: "ui.parts.tree.item.setItems(id, itemId, items);", t3: "ID，子列表配置数组", t4: "无", t5: "重新设置某项的子项元素" },
        { t1: "check", t2: "ui.parts.tree.item.check(id, itemId);", t3: "ID，子项ID", t4: "无", t5: "选中Tree中某个子项（注意：父项不会被选择）" }
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 400,
    config: {
        id: "tree_demo_0",
        click: true,
        style: "",
        items: [
            {
                id: "tree_1",
                text: "分类-1",
                show: true,
                items: [{
                    id: "tree_11",
                    text: "分类-1-1",
                    show: true,
                    items: [{
                        id: "tree_111",
                        text: "分类-1-1-1",
                        show: true
                    }]
                }]
            }, {
                id: "tree_2",
                text: "分类-2",
                items: [{
                    id: "tree_21",
                    text: "分类-2-1",
                }]
            }, {
                id: "tree_3",
                text: "分类-3",
                items: [{
                    id: "tree_31",
                    text: "分类-3-1",
                }]
            }
        ],
        call: {
            click: function(){ alert(this.text + "被点击！"); }
        }
    }
}];

// ui.parts.tree.item.setItems("tree_demo_0", "tree_21",[{ id: "tree_211", text: "分类-2-1-1", }])
