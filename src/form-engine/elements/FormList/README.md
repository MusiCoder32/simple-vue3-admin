### 自增组件部分功能说明

1. 自增组件表格模式,集成了可见范围功能,该功能不能走配置面板,需要直接修改schema,如下设置 "fileRangeType": "{{ $formStatus === 'deal' }}" 当fileRangeType为true时,显示选中成员,当为false时,显示查看按钮,fileRangeType不存在时,不显示可见范围列
2. 支持从外部传入columns；
3. 当需要国际化时，传入的columns需为computed；
4. 不能使用element-ui中的overflow:true属性来设置超长省略提示功能，改用v-ell指令实现，不然会出现以下异常；
提示出现位置错误
![alt text](企业微信截图_17466044514748.png)
