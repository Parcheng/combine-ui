window.config = {};
window.config.info = [
    "<h2>○ 对象结构：</h2>",
    "ui.build: {",
    "    buildTag: 将HTML标签的CONF配置对象转为HTML代码",
    "    buildModule: 将Part或Module的CONF配置对象的HTML代码",
    "    tags: {  用于封装一些常用的HTML标签CONF对象",
    "        brConfig: br的CONF对象",
    "        hrConfig: hr的CONF对象",
    "        nbsps(num): 传入数字，返回指定数量的空格符",
    "    },",
    "    modules: {  用于封装一些常用HTML标签（如：br）,直接调用该对象中的函数即可",
    "        br(): 返回br的HTML代码",
    "    }",
    "}",
];

window.config.fns = {
    header: { t1: "名称", t2: "使用方式", t3: "类型", t4: "参数", t5: "返回值", t6: "描述" },
    body: [
        { t1: "buildTag", t2: "ui.build.buildTag(conf);", t3: "函数", t4: "HTML标签的CONF对象", t5: "HTML代码", t6: "将HTML标签的CONF配置对象转为HTML代码" },
        { t1: "buildModule", t2: "ui.build.buildModule(conf);", t3: "函数", t4: "Part或Module的CONF对象", t5: "HTML代码", t6: "将Part或Module的CONF配置对象的HTML代码" },
        { t1: "tags", t2: "ui.build.tags;", t3: "对象", t4: "-", t5: "CONF对象集", t6: "用于封装一些常用的HTML标签CONF对象" },
        { t1: "modules", t2: "ui.build.modules;", t3: "对象", t4: "-", t5: "HTML函数集", t6: "用于封装一些常用HTML标签（如：br等）,直接调用该对象中的函数即可" }
    ]
};

window.config.demos = undefined;

