export enum BiMenuEnum {
    数据看板 = '/board',
    //数据概览
    基本数据概览 = '/statistics-analysis/overview/base',
    项目分布概览 = '/statistics-analysis/overview/distribution',
    项目类型概览 = '/statistics-analysis/overview/type',
    //变化趋势
    项目增长趋势 = '/statistics-analysis/trend/increase',
    投资类项目变化趋势 = '/statistics-analysis/trend/change',
    //处理分析
    结案方式 = '/statistics-analysis/analysis/method',
    委外情况 = '/statistics-analysis/analysis/outsource',
    处理时长 = '/statistics-analysis/analysis/duration',
    //数据统计
    考核数据 = '/statistics-analysis/statistics/evaluation',
    简报数据 = '/statistics-analysis/statistics/brief',
    项目数据 = '/statistics-analysis/statistics/project',
}

export const urlConfig = {
    sit: {
        [BiMenuEnum['数据看板']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/9ac85baa-9cfe-4b54-ab31-f546ee234139?preview=true',
        [BiMenuEnum['基本数据概览']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/e3fa59b6-c516-440f-af9d-02ffcb04c0a2?preview=true',
        [BiMenuEnum['项目分布概览']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/349383ed-6688-4f10-a323-06c4087fad0b?preview=true',
        [BiMenuEnum['项目类型概览']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/ef722b9b-2f71-4cf1-8610-6f634831a17a?preview=true',
        [BiMenuEnum['项目增长趋势']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/4adf5b91-67ca-4515-8a17-fc228f087e21?preview=true',
        [BiMenuEnum['投资类项目变化趋势']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/63b5b0d1-0aad-4c81-a303-0f5bbc3a68b5?preview=true',
        [BiMenuEnum['结案方式']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/7e12da20-2fb9-4b76-9ef9-7326fa3ca788?preview=true',
        [BiMenuEnum['委外情况']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/d1afeb01-0804-49d8-bf51-06cba5c9f63f?preview=true',
        [BiMenuEnum['处理时长']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/5f242f89-574e-4768-8825-5e389ca5f6a7?preview=true',
        [BiMenuEnum['考核数据']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/9fd60c81-92a3-4db3-a1a0-adfdc1d6b652?preview=true',
        [BiMenuEnum['简报数据']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/b5a3ad79-d67d-4143-aa00-639de26ad3c1?preview=true',
        [BiMenuEnum['项目数据']]:
            'https://eistest.byd.com/webroot/decision/v10/entry/access/ae2f85b9-e3e6-4108-8688-37b07d38ea57?preview=true',
    },
    production: {
        [BiMenuEnum['数据看板']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/119adfab-9eb6-4c59-a842-88537511da53?preview=true',
        [BiMenuEnum['项目类型概览']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/c460fbff-5d4b-4835-916b-6124200eec0b?preview=true',
        [BiMenuEnum['考核数据']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/4d1ec50d-3aab-46d4-9dd6-a3b377c3f184?preview=true',
        [BiMenuEnum['项目数据']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/ba845ce6-8352-412f-85f6-71728adc3ccf?preview=true',
        [BiMenuEnum['投资类项目变化趋势']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/12dd6ddf-9852-446f-a1fc-19cb22cd0c90?preview=true',
        [BiMenuEnum['委外情况']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/368055b7-bd97-4923-abf5-afd3fc23d194?preview=true',
        [BiMenuEnum['处理时长']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/d1dd353f-c436-4fa7-9c57-08226c8d77a7?preview=true',
        [BiMenuEnum['简报数据']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/22d095cf-4721-470a-99f7-18b0025a69ac?preview=true',
        [BiMenuEnum['基本数据概览']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/be560be5-052d-4b14-8061-f1bd1b324314?preview=true',
        [BiMenuEnum['项目分布概览']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/2179f38b-dbb5-4f1e-9f43-c0878c75d0c3?preview=true',
        [BiMenuEnum['项目增长趋势']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/237fc4c2-60cf-4593-aac1-836716455b08?preview=true',
        [BiMenuEnum['结案方式']]:
            'https://eisdashboard.byd.com/webroot/decision/v10/entry/access/44a87aff-0b57-4ee3-b96c-bdf418fe56f5?preview=true',
    },
}
