window.navConfig = {
    id: "page_nav",
    img: {
        width: 5,
        src: "./img/logo.jpg"
    },
    title: {
        width: 8,
        text: "CombineUI"
    },
    main: {
        id: "main",
        style: "text-align: left;",
        groups: [
            { text: "Home", path: "home" },
            { text: "Build", path: "build" },
            { text: "Parts", to: "nav_parts" },
            { text: "Modules", to: "nav_modules" },
            { text: "Page", path: "page" },
            { text: "Common", path: "common" },
            { text: "Config", to: "nav_config" },
        ],
    },
    list: [
        {
            id: "nav_parts",
            gread: 1,
            groups: [
                { text: "Form", path: "part.form" },
                { text: "Grid", path: "part.grid" },
                { text: "Table", path: "part.table" },
                { text: "Page", path: "part.page" },
                { text: "Nav", path: "part.nav" },
                { text: "Content", path: "part.content" },
                { text: "Svg", path: "part.svg" },
                { text: "Custom", path: "part.custom" },
                { text: "Buttons", path: "part.buttons" },
                { text: "Window", path: "part.window" },
                { text: "List", path: "part.list" },
                { text: "Tabs", path: "part.tabs" },
                { text: "DrawBoard", path: "part.drawBoard" },
                { text: "Tree", path: "part.tree" },
                { text: "Accordions", path: "part.accordions" },
                { text: "Screen", path: "part.screen" },
                { text: "Rotate", path: "part.rotate" },
                { text: "Doc", path: "part.doc" }
            ],
        }, {
            id: "nav_modules",
            gread: 1,
            groups: [
                { text: "List", path: "module.list" },
                { text: "Content", path: "module.content" },
                { text: "Form", path: "module.form" },
                { text: "Window", path: "module.window" },
                { text: "Table", path: "module.table" },
                { text: "Tree", path: "module.tree" }
            ],
        }, {
            id: "nav_page",
            gread: 1,
            groups: [
                { text: "暂无", path: "XXXX" },
                { text: "暂无", path: "XXXX" }
            ]
        }, {
            id: "nav_config",
            gread: 1,
            groups: [
                { text: "Common", path: "config.common" },
                { text: "Part", path: "config.part" },
                { text: "Module", path: "config.module" },
                { text: "Page", path: "config.page" }
            ]
        }
    ],
    call: { click: apiFns.check.nav },
}

