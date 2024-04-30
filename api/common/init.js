$(function () {
    apiFns.buildNav("_nav.js");
    apiFns.init("home");
});

ui.config.part.table.defaultRowCount = 1;
var apiFns = {
    init: function(key){
        var keyArr = key.split(".");
        if(keyArr.length > 1)
            $("#title").text(keyArr[1].toUpperCase() + " · · · ");
        else  $("#title").text(keyArr[0].toUpperCase() + " · · · ");
        
        $(document).attr("title", key.replace(".", " - ").toUpperCase());
        apiFns.buildBody(key);
    },
    buildNav: function buildNav(nav) {
        $.getScript("./config/" + nav, function () {
            console.log("Loading " + nav + " ……");
            if (window.navConfig) {
                var domConfig = ui.parts.nav.build(window.navConfig);
                $("#header").html(ui.build.buildModule(domConfig.config));
            }
        });
    },
    buildBody: function (conf) {
        var path = conf.replace(".", "/") + ".js";
        $.getScript("./config/" + path, function () {
            console.log("Loading " + path + " ……");
            if (window.config) {
                // build info html
                var infoElements = window.config.info;
                if (infoElements) {
                    $("#body_info_dis").css("display", "block");
                    for (var infoEI = 0; infoEI < infoElements.length; infoEI++) {
                        var infoElement = infoElements[infoEI];
                        infoElement = infoElement.replace(new RegExp(/( )/g), "&nbsp;");
                        infoElements[infoEI] = "<span class=\"info_p\">" + infoElement + "</span>"
                    }
                    var infoConfig = {
                        id: "body_info",
                        children: [{
                            type: "part.content",
                            config: {
                                id: "b_info",
                                text: {
                                    style: "width:98%; color:black;",
                                    elements: infoElements
                                }
                            }
                        }]
                    };
                    ui.page.build(infoConfig);
                }else{
                    $("#body_info_dis").css("display", "none");
                }


                // build fns html
                if (window.config.fns) {
                    $("#body_fns_dis").css("display", "block");
                    window.config.fns.id = "b_fns";
                    var fnsConfig = ui.parts.table.build(window.config.fns);
                    $("#body_fns").html(ui.build.buildModule(fnsConfig.config));
                }else{
                    $("#body_fns_dis").css("display", "none");
                }

                // build demos html
                var demosConfig = window.config.demos;
                if (demosConfig) {
                    $("#body_demos_dis").css("display", "block");
                    var demoTabsConfig = { id: "my_tabs", elements: [] };
                    for (var demoI = 0; demoI < demosConfig.length; demoI++) {
                        var tabHeight = demosConfig[demoI].height ? demosConfig[demoI].height + 300 : 800;
                        demoTabsConfig.elements.push({
                            id: "demo" + demoI,
                            default: demoI == 0,
                            close: false,
                            title: { style: "width:150px;", text: demosConfig[demoI].title },
                            body: { style: "height:" + tabHeight + "px;", content: "<div id=\"demo" + demoI + "\"></div>" }
                        });
                    }
                    var tabsConfig = ui.parts.tabs.build(demoTabsConfig);
                    $("#body_demos").html(ui.build.buildModule(tabsConfig.config));

                    for (var demoI = 0; demoI < demosConfig.length; demoI++) {
                        var codeStr = apiFns.tool.objtoStr(demosConfig[demoI].config);
                        var demoConfig = {
                            id: "demo" + demoI,
                            children: [{
                                type: conf,
                                config: demosConfig[demoI].config
                            }, {
                                type: "part.custom",
                                config: {
                                    id: "demo_code_" + demoI,
                                    type: "temp",
                                    content: (demosConfig[demoI].html ? ("<hr>" + demosConfig[demoI].html) : "") +
                                    "<br><hr><br><textarea id=\"demo_code_" + demoI + "\" class=\"demo_code\">" +
                                    codeStr.substring(0, codeStr.length - 3) + "</textarea><br>"
                                }
                            }, {
                                type: "part.buttons",
                                config: {
                                    id: "demo_excute_" + demoI,
                                    align: "left",
                                    buttons: [{
                                        demoI: demoI,
                                        demoType: conf,
                                        text: "执行代码",
                                        call: { click: apiFns.check.demoExcute }
                                    }]
                                }
                            }]
                        };
                        ui.page.build(demoConfig);
                    }
                }else{
                    $("#body_demos_dis").css("display", "none");
                }

            }
            else console.log("Config object is undefined.");
        });
    },
    check: {
        nav: function checkNav() {
            if(this.path){
                apiFns.init(this.path);
            }
        },
        title: function (id) {
            var dom = $("#body_" + id);
            var isShow = dom.attr("status");
            if (isShow == "1") {
                dom.css("display", "block");
                dom.attr("status", "0");
            } else {
                dom.css("display", "none");
                dom.attr("status", "1");
            }
        },
        demoExcute: function () {
            var code = $("#demo_code_" + this.demoI).val();
            var demoDom = $("#demo" + this.demoI).children("div")[0];
            $(demoDom).attr("id", "demo_temp_" + this.demoI);
            eval("var newCode = " + code);
            var demoConfig = {
                id: "demo_temp_" + this.demoI,
                children: [{
                    type: this.demoType,
                    config: newCode
                }]
            }
            ui.page.build(demoConfig);
        }
    },
    tool: {
        objtoStr: function (config, index) {
            var tabSymbol = "    ", enterSymbol = "\r";
            if (!index) index = 1;
            var fitstTabStr = "", tabStr = "";
            for (var i = 0; i < index; i++) {
                if (i != 0) fitstTabStr += tabSymbol;
                tabStr += tabSymbol;
            }

            var result = "";
            if (ui.common.is.String(config)) {
                result += "\"" + config + "\", " + enterSymbol;
            } else {
                result += "{ " + enterSymbol;
                for (var configKey in config) {
                    if (config.hasOwnProperty(configKey)) {
                        var configVal = config[configKey];
                        if (ui.common.is.String(configVal)) {
                            // configVal = configVal.replace(new RegExp("<","g"), "&lt;");
                            // configVal = configVal.replace(new RegExp(">","g"), "&gt;");
                            result += tabStr + configKey + ": \"" + configVal + "\", " + enterSymbol;
                        } else if (ui.common.is.Number(configVal) || ui.common.is.Boolean(configVal)) {
                            result += tabStr + configKey + ": " + configVal + ", " + enterSymbol;
                        } else if (ui.common.is.Array(configVal)) {
                            result += (tabStr + configKey + ": [ " + enterSymbol);
                            for (var i = 0; i < configVal.length; i++) {
                                var configValItem = configVal[i];
                                result += tabSymbol + tabStr + apiFns.tool.objtoStr(configValItem, index + 2);
                            }
                            result += (tabStr + "], " + enterSymbol);
                        } else if (typeof configVal == 'function') {
                            result += tabStr + configKey + ": " + configVal.toString() + ", " + enterSymbol;
                        }
                        else result += tabStr + configKey + ": " + apiFns.tool.objtoStr(configVal, index + 1);
                    }
                }
                //result = result.substring(0, result.length-1);
                result = result + fitstTabStr + "}, " + enterSymbol;
            }
            return result;
        }
    }
}



