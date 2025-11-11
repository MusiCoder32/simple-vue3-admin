export default {
    rules: {
        'type-empty': [2, 'never'], // 禁止 type 为空
        'type-enum': [
            2,
            'always',
            [
                // 在这里列出你允许的类型列表
                'feat', // 新功能
                'fix', // 修复
                'locale', //国际化文件修改
                'docs', // 文档
                'style', // 格式
                'refactor', // 重构
                'test', // 测试
                'chore', // 构建/工程相关
                'revert', //撤销，版本回退,perf ,//性能优 ,//test：测试
                'improve', //改进
                'build', //打包
                'ci', //持续集成
                'update', //更新
                'merge', //解决冲突
            ],
        ],
    },
}
