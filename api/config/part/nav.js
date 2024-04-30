window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"nav_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "align: \"left\",    【 主导航对其方式，默认center居中。可选值：left|center|right 】",
    "img: {    【 导航头LOGO配置对象 】",
    "    width: \"5\",    【 宽度，表示占整个导航条宽度的百分比，默认0。可选值：0~99 】",
    "    style: \"text-align: left;\",    【 主导航自定义样式，支持所有CSS样式 】",
    "},   ",
    "title: {    【 导航头标题配置对象 】",
    "    width: \"5\",    【 宽度，表示占整个导航条宽度的百分比，默认0。可选值：0~99 】",
    "    text: \"API\",    【 显示在LOGO后方的标题文本 】",
    "},   ",
    "tool: {    【 （*未实现）导航条右侧工具条（一般用于显示个人中心或者公共查询等信息） 】",
    "    width: \"5\",    【 宽度，表示占整个导航条宽度的百分比，默认0。可选值：0~99 】",
    "    ......",
    "},   ",
    "main: {    【 可简写：省略下面的id、style、groups参数，直接传下面groups的数组即可（下面实例就是简写形式） 】",
    "    id: \"main\",    【 主导航ID 】",
    "    style: \"text-align: left;\",    【 主导航自定义样式，支持所有CSS样式 】",
    "    groups: [    【 主导航配置对象数组 】",
    "        {    ",
    "            id: \"my_nav_main_1\",     【 主导航ID 】",
    "            text: \"A-MAIN\",     【 显示文本 】",
    "            to: \"my_nav_list_1\"    【 点击后展开的子导航ID，去掉该配置项点击会触发单击回调函数 】",
    "            call: {      【 主导航中，优先级最高，同一个事件只会触发优先级最高的函数 】",
    "                click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                    fn: function(){ alert(this.text + \"被点击！\"); } ,    【 主导航被点击时触发的公共回调函数，注意：当有to配置也会触发 】",
    "                    params: {} ",
    "                }",
    "            } ",
    "        },    ",
    "        ......    ",
    "    ]   ",
    "},   ",
    "list: [    【 子导航配置对象数组 】",
    "    {    ",
    "        id: \"my_nav_list_1\",    【 子导航ID 】",
    "        gread: 1,    【 级别，主导航默认级别为0，1级别子导航可展开2级别子导航，依次类推 】",
    "        groups: [    【 导航组对象数组 】",
    "            {     ",
    "                title: \"A-Title\",    【 导航组标题，只做显示，不可点击，不会触发点击事件 】",
    "                nodes: [    【 当前导航组的导航对象数组 】",
    "                    {     ",
    "                        text: \"A1-TEXT\"    【 显示文本 】",
    "                        to: \"my_nav_list_1_1\"    【 点击后展开的2级子导航ID，去掉该配置项点击会触发单击回调函数 】",
    "                    },     ",
    "                    ......    ",
    "                ]     ",
    "            },    ",
    "            ......    ",
    "         ]    ",
    "    },  {  ",
    "        id: \"my_nav_list_1_1\",    ",
    "        gread: 2,    ",
    "        call: {      【 子导航中优先级第二，同一个事件只会触发优先级最高的函数，注意：仅对glist数组中该对象内的所有导航生效 】",
    "            click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                fn: function(){  ....  }  【 子导航被点击时触发的公共回调函数，注意：当有to配置也会触发 】",
    "                params: {} ",
    "            }",
    "        } ",
    "        groups: [    【 导航组对象数组 】",
    "            {     ",
    "                title: \"A-A-Title\",    ",
    "                nodes: [ { text: \"A1-A1-TEXT\"  },  ......  ], ",
    "                call: {     【 子导航中优先级最高，同一个事件只会触发优先级最高的函数，注意：仅对groups数组中该对象内的所有导航生效 】",
    "                    click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                        fn: function(){  ....  }  【 主导航被点击时触发的公共回调函数，注意：当有to配置也会触发 】",
    "                        params: {} ",
    "                    }",
    "                } ",
    "            },    ",
    "            ......    ",
    "         ]    ",
    "    },    ",
    "    ......    ",
    "],    ",
    "call: ｛    【 事件回调函数对象，所有导航中优先级最低，对所有导航都生效 】",
    "    click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(){  ....  }      【 单击事件回调函数，可选值：函数|函数路径字符串。this：当前导航节点配置对象 】",
    "        params: {}      【 单击事件回调函数参数，可选值：所有类型 】",
    "    }",
    "}",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "nodes: 导航节点集对象，包含导航中所有导航节点配置对象，可通过 nodes.导航nodeID 获得该导航项配置对象",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.nav.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.nav.getConfig(id);", t3: "导航条ID", t4: "配置参数对象", t5: "获得指定 ID 的导航条配置参数" },
        { t1: "checked", t2: "ui.parts.nav.checked(id, listId, nodeId);", t3: "导航条ID，导航列表ID，导航ID", t4: "无", t5: "触发指定 ID 导航的单击事件" },
        { t1: "unCheckedAll", t2: "ui.parts.nav.unCheckedAll(id);", t3: "导航条ID", t4: "无", t5: "收起全部下拉导航栏" },
        { t1: "init", t2: "ui.parts.nav.init(...);", t3: "待定", t4: "无", t5: "未实现，初始化导航，设置默认选择项" }
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 200,
    config: {
        id: "nav_demo_0",
        align: "left",
        img: {
            width: 5,
            src: "./img/xl.svg"
        },
        title: {
            width: 8,
            text: "NAV-API"
        },
        main: [{ text: "A-MAIN", to: "my_nav_list_1" }, { text: "B-MAIN", to: "my_nav_list_2" }, { text: "C-MAIN", to: "my_nav_list_3" }],
        list: [{
            id: "my_nav_list_1",
            gread: 1,
            call: { click: function () { alert(this.text + "被点击！") } },
            groups: [
                { title: "A-Title", nodes: [{ text: "A2-TEXT" }, { text: "A3-TEXT" }, { text: "A4-TEXT" }] },
                { title: "A-Title", nodes: [{ text: "A1-TEXT" }, { text: "A2-TEXT" }, { text: "A3-TEXT" }, { text: "A4-TEXT" }] },
                { title: "A-Title", nodes: [{ text: "A1-TEXT" }, { text: "A2-TEXT" }, { text: "A3-TEXT" }, { text: "A4-TEXT" }] }
            ]
        }, {
            id: "my_nav_list_2",
            gread: 1,
            call: { click: function () { alert(this.text + "被点击！") } },
            groups: [
                { title: "B-Title", nodes: [{ text: "B1-TEXT" }, { text: "B2-TEXT" }, { text: "B3-TEXT" }, { text: "B4-TEXT" }] },
                { title: "B-Title", nodes: [{ text: "B1-TEXT" }, { text: "B2-TEXT" }, { text: "B3-TEXT" }, { text: "B4-TEXT" }] },
                { title: "B-Title", nodes: [{ text: "B1-TEXT" }, { text: "B2-TEXT" }, { text: "B3-TEXT" }, { text: "B4-TEXT" }] }
            ]
        }, {
            id: "my_nav_list_3",
            gread: 1,
            call: { click: function () { if(!this.to) alert(this.text + "被点击！") } },
            groups: [
                { title: "C-Title", nodes: [{ text: "C1-TEXT" }, { text: "C2-TEXT" }, { text: "C3-TEXT" }, { text: "C4-TEXT" }] },
                { title: "C-Title", nodes: [{ text: "C1-TEXT" }, { text: "C2-TEXT" }, { text: "C3-TEXT" }, { text: "C4-TEXT" }] },
                { title: "C-Title", nodes: [{ text: "C1-TEXT" }, { text: "C2-TEXT" }, { text: "C3-TEXT" }, { text: "C4-TEXT", to: "my_nav_list_4" }] }
            ]
        }, {
            id: "my_nav_list_4",
            gread: 2,
            call: { click: function () { alert(this.text + "被点击！") } },
            groups: [
                { title: "D-Title", nodes: [{ text: "D1-TEXT" }, { text: "D2-TEXT" }, { text: "D3-TEXT" }, { text: "D4-TEXT" }] },
                { title: "D-Title", nodes: [{ text: "D1-TEXT" }, { text: "D2-TEXT" }, { text: "D3-TEXT" }, { text: "D4-TEXT" }] },
                { title: "D-Title", nodes: [{ text: "D1-TEXT" }, { text: "D2-TEXT" }, { text: "D3-TEXT" }, { text: "D4-TEXT" }] }
            ]
        }]
    }
}];



