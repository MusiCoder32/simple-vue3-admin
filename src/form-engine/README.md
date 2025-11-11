### 表单引擎使用讲解

1. 给日期选择组件设置默认时间为当前时间在表单设计界面初始值设为 {{ new Date()}}
2. button组件的自定义事件通过otherOptions对象传入组件,在配置界面需使用{{事件名}}方式写入配置;
3. 除button组件的其他组件外部事件关联在表单设计界面,展开联动规则,添加外部事件联动选项,选择对应的事件类型,并填入外部事件名xxx;该外部事件需通过provide('$selfEvents',{xxx:()=>})注入,在表单事件联动处直接填写事件名
4. 自增组件的表格模式下,增加了操作列外部配置能力,其按钮事件也通过$selfEvents使用inject注入,当按钮为删除时,删除方法需return 'delSuccess',组件内容才会删除行数据
5. 自增组件表格模式下, 初始化组件要设置只读状态,需在配置界面写入.form-readonly样式;
6. 本项目中需自适应两列的组件,不能用栅格组件嵌套,且需要写入.grid-two样式;
7. 表单配置时可使用的插值({{}}双花括号)如下,schema-form.vue文件中context对象下的属性均可使用,后期扩展也在该对象下扩展;
```javascript

const context = computed(() => ({
    $values: formValues.value,
    $selectData: selectData,
    $utils: {},
    ...props.schemaContext,
    $formStatus: props.formStatus,
}))

```
目前主要使用$values\schemaContext\$formStatus
    $values储存了表单字段的当前值;
    schemaContext用于传入button自定义事件;
    $formStatus用于灵活设置表单状态判断,主要用于表单中某些字段根据该值来做一些逻辑处理;
    $item用于获取自增组件行数据

8. textarea最大行数设置为有限行数如4,才能看到展开收起功能
