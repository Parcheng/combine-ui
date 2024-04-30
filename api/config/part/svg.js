window.config = {};
window.config.info = [
    "<h2>○ 参数结构：</h2>",
    "id: \"svg_demo_0\",    【 该Part的ID，可通过 getConfig() 获取配置参数对象等 】",
    "style: \"cursor:pointer;\",    【 自定义样式，可选值：CSS格式样式 】",
    "elements: [{    【 SVG图形对象数组 】",
    "    id: \"svg_demo_img\",    【 图形对象ID 】",
    "    type: \"image\",     【 SVG图形类型，image图片类型，可选值：image|rect|circle|text 】",
    "    click: true,     【 公共配置，是否支持单击事件，默认false 】",
    "    dblclick: true,     【 公共配置，是否支持双击事件，默认false 】",
    "    properties: {     【 该SVG对象属性配置，可选值：当前类型的SVG支持的所有属性 】",
    "        \"xlink:href\": \"./img/xl.svg\", width: \"30px\", height: \"30px\", x: \"10\", y: \"10\" ",
    "    },",
    "    call: ｛    【 事件回调函数对象，优先级最高。注意：只会触发优先级高的回调函数 】",
    "        click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "            fn: function(){  ....  }      【 单击事件回调函数，可选值：函数|函数路径字符串。this：当前svg配置对象 】",
    "            params: {}      【 单击事件回调函数参数，可选值：所有类型 】",
    "        }",
    "        dblclick: ｛    【 双击事件回调对象，如果没有自定义参数，可简写成dblclick: function(){ ...... } 】",
    "            fn: function(){  ....  }      【 双击事件回调函数，可选值：函数|函数路径字符串。this：当前svg配置对象 】",
    "            params: {}      【 双击事件回调函数参数，可选值：所有类型 】",
    "        }",
    "    }",
    "}, { ",
    "    id: \"svg_demo_rect\",  ",
    "    type: \"rect\",    【 rect方形类型，可选值：image|rect|circle|text 】",
    "    properties: { width: \"50px\", height: \"50px\", x: \"60\", y: \"10\", fill: \"red\", stroke: \"black\", \"stroke-width\": \"3\" }",
    "}, {",
    "    id: \"svg_demo_circle\",  ",
    "    type: \"circle\",    【 circle圆形类型，可选值：image|rect|circle|text 】",
    "    properties: { r: \"23\", cx: \"155\", cy: \"33\", fill: \"blue\", stroke: \"black\", \"stroke-width\": \"3\" }",
    "}, {  ",
    "    id: \"svg_demo_text\",  ",
    "    type: \"text\",    【 circle文本类型，可选值：image|rect|circle|text 】",
    "    text: \"SVG 的文本元素\",     【 显示的文本内容 】",
    "    properties: { fill: \"black\", x: \"250\", y: \"30\" } ",
    "}],",
    "call: ｛    【 公共事件回调函数对象，优先级最低。注意：只会触发优先级高的回调函数 】",
    "    click: ｛    【 单击事件回调对象，如果没有自定义参数，可简写成click: function(){ ...... } 】",
    "        fn: function(){  ....  }      【 单击事件回调函数，可选值：函数|函数路径字符串。this：当前svg配置对象 】",
    "        params: {}      【 单击事件回调函数参数，可选值：所有类型 】",
    "    }",
    "    dblclick: ｛    【 双击事件回调对象，如果没有自定义参数，可简写成dblclick: function(){ ...... } 】",
    "        fn: function(){  ....  }      【 双击事件回调函数，可选值：函数|函数路径字符串。this：当前svg配置对象 】",
    "        params: {}      【 双击事件回调函数参数，可选值：所有类型 】",
    "    }",
    "}",
    "",
    "<h2>○ 返回值：</h2>",
    "id: 该 Part 的 ID",
    "params: 该 Part 的配置对象（调用 build 函数传入的配置对象）",
    "config: CONF对象，需要使用 ui.build.buildModule(CONF) 函数转换成 HTML 代码",
    "",
    "<h2>○ 使用方式：</h2>",
    "var partObj = ui.part.svg.build(conf);      【 参数：上述介绍的配置对象 】",
    "var partHtml = ui.build.buildModule(partObj.config);      【 将CONF对象转换成HTML代码 】",
    "$(\"#...\").html(partHtml);      【 将HTML代码插入到指定DOM中 】"
];

window.config.fns = {
    header: { t1: "函数名", t2: "使用方式", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t1: "getConfig", t2: "ui.parts.svg.getConfig(id);", t3: "ID", t4: "配置参数对象", t5: "获得指定 ID 的 SVG 配置参数" },
        { t1: "click", t2: "ui.parts.svg.click(id);", t3: "ID", t4: "无", t5: "触发指定 ID 的 SVG 单击事件" },
        { t1: "dblclick", t2: "ui.parts.svg.dblclick(id);", t3: "ID", t4: "无", t5: "触发指定 ID 的 SVG 双击事件" },
        { t1: "element.click", t2: "ui.parts.svg.element.click(id, elementId);", t3: "ID，子元素ID", t4: "无", t5: "触发指定 ID 的 SVG 子元素的单击事件" },
        { t1: "element.dblclick", t2: "ui.parts.svg.element.dblclick(id, elementId);", t3: "ID，子元素ID", t4: "无", t5: "触发指定 ID 的 SVG 子元素的双击事件" },
        { t1: "element.get", t2: "ui.parts.svg.element.get(id, elementId);", t3: "ID，子元素ID", t4: "无", t5: "获得指定 ID 的 SVG 子元素的配置参数" },
        { t1: "element.add", t2: "ui.parts.svg.element.add(id, params);", t3: "ID，子元素配置对象", t4: "无", t5: "在指定 ID 的 SVG 元素中添加子元素" },
        { t1: "element.change", t2: "ui.parts.svg.element.change(id, elementId, properties, style, other);", t3: "ID，子元素ID，要变更的属性对象，要变更的样式，要变更的其他属性", t4: "无", t5: "修改指定 ID 的 SVG 子元素的配置" },
        { t1: "element.remove", t2: "ui.parts.svg.element.remove(id, elementId);", t3: "ID，子元素ID", t4: "无", t5: "删除指定 ID 的 SVG 子元素" }
    ]
};

window.config.demos = [{
    title: "基本示例",
    height: 300,
    config: {
        id: "svg_demo_0",
        style: "cursor:pointer;",
        elements: [{
            id: "svg_demo_img",
            type: "image", click: true, properties: { "xlink:href": "./img/xl.svg", width: "30px", height: "30px", x: "10", y: "10" },
            call: { click: function () { alert("SVG 的 image 元素被点击！") } }
        }, {
            id: "svg_demo_rect",
            type: "rect",
            properties: { width: "50px", height: "50px", x: "60", y: "10", fill: "red", stroke: "black", "stroke-width": "3" }
        }, {
            id: "svg_demo_circle",
            type: "circle",
            properties: { r: "23", cx: "155", cy: "33", fill: "blue", stroke: "black", "stroke-width": "3" }
        }, {
            id: "svg_demo_text",
            type: "text",
            text: "SVG 的文本元素", properties: { fill: "black", x: "250", y: "30" }
        }]
    }
}];