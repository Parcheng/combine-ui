window.config = {};
window.config.info = [
    "公共函数对象",
    "可以在该对象中封装更多的公共函数，供自己使用",
    "注意：内置的函数仅供参考，可以使用，但不要尝试修改内置函数，会导致框架无法使用",
];

window.config.fns = {
    header: { t2: "函数", t3: "参数", t4: "返回值", t5: "描述" },
    body: [
        { t2: "common.getJSON(path)", t3: "String", t4: "Object", t5: "加载JSON文件" },
        { t2: "common.jqAjax(params)", t3: "Object", t4: "无", t5: "调用Jquery的Ajax函数" },
        { t2: "common.ajax(params)", t3: "{method,url,async,data，success}", t4: "无", t5: "源生Ajax封装" },
        { t2: "common.ajaxFileUpload(fileId, suffixs, url, success, error)", t3: "String, Array, String, Funtion，Funtion", t4: "无", t5: "文件上传" },
        { t2: "common.getBasePath()", t3: "无", t4: "String", t5: "获取当前页面的URL根路径" },
        { t2: "common.dateFromat(date, fromat)", t3: "Date, String", t4: "String", t5: "格式化时间" },
        { t2: "common.isEmpty(obj)", t3: "Object", t4: "boolean", t5: "判断是否为空，参数可以为任何类型" },
        { t2: "common.is.Array(obj)", t3: "Object", t4: "boolean", t5: "判断参数类型是否为Array" },
        { t2: "common.is.Boolean(obj)", t3: "Object", t4: "boolean", t5: "判断参数类型是否为Boolean" },
        { t2: "common.is.Date(obj)", t3: "Object", t4: "boolean", t5: "判断参数类型是否为Date" },
        { t2: "common.is.Number(obj)", t3: "Object", t4: "boolean", t5: "判断参数类型是否为Number" },
        { t2: "common.is.Object(obj)", t3: "Object", t4: "boolean", t5: "判断参数类型是否为Object" },
        { t2: "common.is.RegExp(obj)", t3: "Object", t4: "boolean", t5: "判断参数类型是否为RegExp" },
        { t2: "common.is.String(obj)", t3: "Object", t4: "boolean", t5: "判断参数类型是否为String" },
        { t2: "common.is.Window(obj)", t3: "Object", t4: "boolean", t5: "判断参数类型是否为Window" },
        { t2: "common.is.HTMLDocument()", t3: "Object", t4: "boolean", t5: "判断参数类型是否为HTMLDocument" },
        { t2: "common.deepCopy(obj)", t3: "Object", t4: "Object", t5: "拷贝对象，按照参数的对象结构返回一个新对象" },
        { t2: "common.callFn(obj, fn, params, bindThis)", t3: "Object，Founction|String, Object, Object", t4: "无", t5: "使用Call方式调用函数" },
        { t2: "common.getByPath(base, path)", t3: "Object，String", t4: "Object", t5: "将类似于\"a.b\结构的字符串转换为对象结构" },
        { t2: "common.getQueryString(name)", t3: "String", t4: "String|Object", t5: "获取当前URL指定参数值，如果不传参数则获得所有URL参数" },
        { t2: "common.replace(temp, data, regStr, format)", t3: "Object|String|Array, Object, String, 暂未实现", t4: "Object|String|Array", t5: "使用data对象中的属性，替换temp中所有带regStr标识的内容" },
        { t2: "common.getUuid(prefix, suffix)", t3: "String, String", t4: "String", t5: "获得随机字符串，可自定义前后缀" },
        { t2: "common.addDataToObj(key, data, obj)", t3: "String, Object", t4: "Object", t5: "将data数据设置到obj中名称为key的属性中（Key可以为\"a.b\结构）" }
    ]
};

window.config.demos = undefined;