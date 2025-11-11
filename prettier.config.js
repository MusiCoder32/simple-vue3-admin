export default {
    printWidth: 120, // 每行代码长度（默认80）
    semi: false, // 声明结尾使用分号(默认true)
    tabWidth: 4, // 每个tab相当于多少个空格（默认2）
    useTabs: false, // 是否使用tab进行缩进（默认false）
    singleQuote: true, // 使用单引号（默认false）
    trailingComma: 'all', // 多行使用拖尾逗号（默认none）
    endOfLine: 'auto', // 换行符设置
    bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
    arrowParens: 'always', // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
    htmlWhitespaceSensitivity: 'ignore',
    vueIndentScriptAndStyle: false, //缩进Vue文件中的脚本和样式标签
    quoteProps: 'as-needed', // “as-needed” - 仅在需要时在对象属性周围添加引号
    jsxSingleQuote: false, //在JSX中是否使用单引号
    insertPragma: false, //在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了
    requirePragma: false, //严格按照文件顶部的一些特殊的注释格式化代码
    proseWrap: 'never',
    rangeStart: 0, // 起始格式化文件位置
    bracketSameLine: true,
    plugins: ['prettier-plugin-tailwindcss'],
}
