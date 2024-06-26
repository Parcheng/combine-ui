window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"drawBoard_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "region: true,    【 默认false 】",
    "tool: {    【 工具条配置对象 】",
    "    title: \"\",    【 工具条标题，默认无 】",
    "    style: \"width: 80px; color:black;\",    【 工具条自定义样式，可选值：CSS格式样式 】",
    "    bars: [    【 工具栏配置对象数组，工具条中包含一个或多个工具栏 】",
    "        {",
    "            col: 2,    【 列数 】",
    "            style: \"margin:0px 2px;\",    【 工具栏自定义样式，可选值：CSS格式样式 】",
    "            elements: [    【 工具项配置对象数组 】",
    "                { ",
    "                    key: \"a\",     【 工具项Key 】",
    "                    text: \"A\",     【 工具项显示文本，默认无 】",
    "                    icon: \"\",     【 工具项显示图标，默认无 】",
    "                    drag: true,     【 是否允许拖拽触发事件 】",
    "                    click: true,     【 是否允许单击触发事件 】",
    "                    leftPoint: false,     【 工具栏左连接点配置，当为false时不显示连接点，为字符时表示连接点显示的符号 】",
    "                    rightPoint: \">\",     【 工具栏右连接点配置 】",
    "                    call: ｛    【 工具事件回调函数对象，优先级最高。注意：只会触发优先级高的回调函数 】",
    "                        click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                            fn: function(){ .... }      【 单击事件回调函数，可选值：函数|函数路径字符串 】",
    "                            params: {}      【 单击事件回调函数参数，可选值：所有类型 】",
    "                        }",
    "                        drag: ｛    【 拖拽事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                            fn: function(){ .... }      【 拖拽事件回调函数，可选值：函数|函数路径字符串 】",
    "                            params: {}      【 拖拽事件回调函数参数，可选值：所有类型 】",
    "                        }",
    "                    }",
    "                },",
    "                ......",
    "            ],",
    "            call: ｛    【 工具栏公共事件回调函数对象，优先级第二。注意：只会触发优先级高的回调函数 】",
    "                click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                            fn: function(){ .... } ",
    "                    params: {} ",
    "                }",
    "                drag: ｛    【 拖拽事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "                    fn: function(){ .... } ",
    "                    params: {} ",
    "                }",
    "            }",
    "        }, ",
    "        ......",
    "    ],",
    "    call: ｛    【 工具条公共事件回调函数对象，优先级最低。注意：只会触发优先级高的回调函数 】",
    "        click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "            fn: function(params){     【 单击事件回调函数，可选值：函数变量的路径字符串|函数。this：当前tool配置对象 】",
    "                ui.parts.drawBoard.shape.create(    【 创建图形函数 】",
    "                    'drawBoard_demo_0',    【 画布ID，指定在哪个画布上创建图形 】",
    "                    {    【 图形配置对象 】",
    "                        type: params.key,    【 图形类型，用于区分图形种类 】",
    "                        style: \"\",    【 图形自定义CSS样式 】",
    "                        title: \"\",    【 鼠标移动到图形上时的显示信息，同HTML标签的title属性同样效果，默认无 】",
    "                        leftPoint: \"false\",    【 图形左连接点配置，当为false时不显示连接点，为字符时表示连接点显示的符号 】",
    "                        rightPoint: \">\",     【 图形右连接点配置 】",
    "                        checked: true,    【 图形是否允许选择，默认true 】",
    "                        dblclick: true,    【 图形是否允许双击，默认true 】",
    "                        connect: true,    【 图形是否允许连接，默认true 】",
    "                        del: true,    【 图形是否允许删除，默认true。提示：选中图形按删除键即可删除图形 】",
    "                        zoom: true,    【 未实现。图形是否允许缩放，默认true 】",
    "                        base: {     【 图形基本配置 】",
    "                            top: params.top,     【 图形位置信息，距画布顶端距离 】",
    "                            left: params.left,     【 图形位置信息，距画布左端距离 】",
    "                            width: \"50px\",     【 图形宽度 】",
    "                            height: \"50px\",     【 图形高度 】",
    "                            zIndex: 999,     【 图形层叠级别，当图形重叠时，高级别的会覆盖低级别的图形 】",
    "                            border: \"1px dashed #FF9966\"     【 图形边框样式配置 】",
    "                        },",
    "                        body: params.text,    【 图形内显示的文本内容 】",
    "                        call: {     【 图形事件回调函数，提示：如果有参数可以写成dblclick:{ fn,params}形式 】",
    "                            dblclick : function () { ... } }    【 双击事件回调函数，可选值：函数变量的路径字符串|函数。this：当前shape配置对象 】",
    "                            checked : function () { ... } }    【 选中事件回调函数，可选值：函数变量的路径字符串|函数。this：当前shape配置对象 】",
    "                            change : function () { ... } }    【 未实现，当图形属性或样式发生改变时回调函数，可选值：函数变量的路径字符串|函数。this：当前shape配置对象 】",
    "                            delete : function () { ... } }    【 删除事件回调函数，可选值：函数变量的路径字符串|函数。this：当前shape配置对象 】",
    "                    };",
    "                );",
    "            } ",
    "            params: {} ",
    "        }",
    "        drag: ｛    【 拖拽事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "            fn: function(){ .... }    【 可选值：函数变量的路径字符串|函数。this：当前tool配置对象 】",
    "            params: {} ",
    "        }",
    "    }",
    "},",
    "connect: {    【 画布中图形连接配置对象 】",
    "    verify: {    【 连接验证配置对象 】",
    "        a: {     【 只针对type为a的图形生效 】",
    "            maxIn: 10,     【 允许被连接的最大数量 】",
    "            maxOut: 10,     【 允许连接到其他图形的最大数量 】",
    "            to: {     【 允许连接到哪些Type的图形上 】",
    "                \"e\": 1,     【 表示一个type=a的图形只可以连接到1个type=e的图形上 】",
    "                \"f\": 2,     【 表示一个type=a的图形同时可以连接到2个type=f的图形上 】",
    "            } ",
    "            from: {     【 允许被些Type的图形连接，提示：一般情况下to和from只配置一个即可 】",
    "                \"b\": 1,     【 表示一个type=a的图形只可以被1个type=b的图形连接 】",
    "                \"c\": 2,     【 表示一个type=a的图形同时可以被2个type=c的图形连接 】",
    "            } ",
    "        },",
    "        ......",
    "    }",
    "},",
    "shape: {    【 画布中图形规则配置对象 】",
    "    maxNum: 4,    【 所有图形在画板上可以存在的总数量，默认不限制 】",
    "    keyMaxNum: {     【 配置每种图形类型在画板上可以存在的总数量，默认无限制 】",
    "        a: 2,      【 type=a的图形在整个画布上最多可以存在2个 】",
    "        b: 1,      【 type=b的图形在整个画布上只可以存在1个 】",
    "    }",
    "}",
    "",
    "返回值：",
    "shape: 所有图形对象，可通过 shape['shape' + 图形 ID] 获取到对应 ID 图形对象",
    "connects: 所有连线对象，可通过 connects['connect' + 连线 ID] 获取到对应 ID 连线对象",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "shape: 图形集对象，包含画板上所有图形配置对象，可通过 shpae.图形ID 获得图形配置对象",
    "connects: 连线集对象，包含画板上所有连线配置对象，可通过 connects.连线ID 获得连线配置对象",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.drawBoard.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.drawBoard.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的画板配置参数"},
        { t1: "getCurr", t2: "ui.parts.drawBoard.getCurr(id);", t3: "ID", t4: "配置对象", t5: "获得指定 ID 的画板对象"},
        { t1: "click", t2: "ui.parts.drawBoard.click(id);", t3: "ID", t4: "无", t5: "触发指定 ID 的画板点击事件（被选中的图形、连线会取消选择）"},
        { t1: "region", t2: "ui.parts.drawBoard.region(id);", t3: "ID", t4: "无", t5: "框架内部使用函数，触发指定 ID 的画板的工具栏元素拖动图形创建事件"},
        { t1: "zoom", t2: "ui.parts.drawBoard.zoom(id, addWidth, addHeight);", t3: "ID，累加宽度，累加高度", t4: "无", t5: "缩放画板，累计的宽高可以是数字或百分比"},
        { t1: "tool.click", t2: "ui.parts.drawBoard.tool.click(id, barIndex, key);", t3: "ID，Bar索引，工具Key", t4: "无", t5: "触发指定 Key 工具栏项的单击事件"},
        { t1: "tool.drag", t2: "ui.parts.drawBoard.tool.drag(id, barIndex, key);", t3: "ID，Bar索引，工具Key", t4: "无", t5: "触发指定 Key 工具栏项的拖动事件"},
        { t1: "shape.create", t2: "ui.parts.drawBoard.shape.create(id, params);", t3: "ID，图形配置对象", t4: "图形对象", t5: "在画板中创建一个图形"},
        { t1: "shape.dblclick", t2: "ui.parts.drawBoard.shape.dblclick(id, shapeId);", t3: "ID，图形ID", t4: "无", t5: "触发指定 ID 图形的双击事件"},
        { t1: "shape.drag", t2: "ui.parts.drawBoard.shape.drag(id, shapeId);", t3: "ID，图形ID", t4: "无", t5: "框架内部使用函数，触发指定 ID 图形的拖拽事件"},
        { t1: "shape.getConfig", t2: "ui.parts.drawBoard.shape.getConfig(id, shapeId);", t3: "图形配置参数对象", t4: "ID，图形ID", t5: "获得指定 ID 图形的配置参数对象"},
        { t1: "shape.change", t2: "ui.parts.drawBoard.shape.change(id, shapeId);", t3: "无", t4: "ID，图形ID", t5: "未实现，修改指定 ID 图形的配置参数"},
        { t1: "shape.checked", t2: "ui.parts.drawBoard.shape.checked(id, shapeId);", t3: "无", t4: "ID，图形ID", t5: "使指定 ID 的图形被选择"},
        { t1: "shape.uncheckAll", t2: "ui.parts.drawBoard.shape.uncheckAll(id);", t3: "ID", t4: "无", t5: "取消选择画板上的所有图形"},
        { t1: "shape.delete", t2: "ui.parts.drawBoard.shape.delete(id, shapeId);", t3: "ID，图形ID", t4: "无", t5: "删除指定 ID 的图形"},
        { t1: "shape.deleteAll", t2: "ui.parts.drawBoard.shape.deleteAll(id);", t3: "ID", t4: "无", t5: "删除所有被选中的图形"},
        { t1: "connect.create", t2: "ui.parts.drawBoard.connect.create(id, shapeId);", t3: "ID，起始图形ID", t4: "无", t5: "框架内部使用函数，触发指定画板上的图形连线函数"},
        { t1: "connect.add", t2: "ui.parts.drawBoard.connect.add(id, fromId, toId, [connectId]);", t3: "ID，图形ID，图形ID，[连线ID]", t4: "无", t5: "在指定画板上创建一条连线"},
        { t1: "connect.checked", t2: "ui.parts.drawBoard.connect.checked(id, connectId);", t3: "ID，连线ID", t4: "无", t5: "使指定 ID 的连线被选中"},
        { t1: "connect.uncheckAll", t2: "ui.parts.drawBoard.connect.uncheckAll(id);", t3: "ID", t4: "无", t5: "取消选择画板上所有连线"},
        { t1: "connect.delete", t2: "ui.parts.drawBoard.connect.delete(id, connectId);", t3: "ID，连线ID", t4: "无", t5: "删除指定 ID 的连线"},
        { t1: "connect.deleteAll", t2: "ui.parts.drawBoard.connect.deleteAll(id);", t3: "ID", t4: "无", t5: "删除画板上所有被选中的连线"}
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 400,
    config: {
        id: "drawBoard_demo_0",
        region: true,
        tool: {
            title: "",
            style: "width: 80px; color:black;",
            bars: [{
                col: 2,
                style: "margin:0px 2px;",
                elements: [
                    { key: "a", text: "A", icon: "", drag: true, leftPoint: false, rightPoint: ">" },
                    { key: "b", text: "B", icon: "", drag: true, leftPoint: ">", rightPoint: ">" },
                    { key: "c", text: "C", icon: "", drag: true, leftPoint: false, rightPoint: ">" },
                    { key: "d", text: "D", icon: "", drag: true, leftPoint: false, rightPoint: ">" }
                ]
            }, {
                col: 2,
                style: "margin:0px 2px;",
                elements: [
                    { key: "e", text: "E", icon: "", drag: true, leftPoint: false, rightPoint: ">" },
                    { key: "f", text: "F", icon: "", drag: true, leftPoint: ">", rightPoint: ">" },
                    { key: "g", text: "G", icon: "", drag: true, leftPoint: false, rightPoint: ">" },
                    { key: "h", text: "H", icon: "", drag: true, leftPoint: false, rightPoint: ">" }
                ]
            }],
            call: {
                drag: function (params) {
                    if (parseInt(params.left) < 80) params.left = 80 + "px";
                    ui.parts.drawBoard.shape.create('drawBoard_demo_0', {
                        type: params.key,
                        base: { top: params.top, left: params.left, width: "50px", height: "50px", zIndex: 999, border: "1px dashed #FF9966" },
                        body: params.text,
                        call: { dblclick : function () { alert(params.key + "模块被点击！")  } }
                    });
                }
            }
        },
        connect: {
            verify: {
                e: { maxIn: 10, maxOut: 10, to: { "a": 1, "f": 1, "g": 1 } },
                f: { maxIn: 10, maxOut: 10, from: { "a": 1, "b": 1, "e": 1 } }
            }
        },
        shape: {
            maxNum: 4,
            keyMaxNum: { a: 2, b: 1, c: 1, d: 2, e: 3 }
        }
    }
}];


