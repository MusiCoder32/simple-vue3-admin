
1. 翻页多选功能必要配置如下

```html
showCheckbox: 开启多选功能
reserve-selection: 开启已选项保留功能
rowKey: 设置rowid,必须唯一,不然会渲染异常,如翻页时表格多出一些行数据
checkboxSelect 获取所有已勾选行

<simple-table
    :showCheckbox="true"
    :reserve-selection="true"
    :other-options="{
                rowKey: 'id',
            }"
    @checkboxSelect="handleOurSelect" />
```
