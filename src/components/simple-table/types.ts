import { ColInfo } from 'xlsx-js-style'
import { Component } from 'vue'
import { FormRules } from 'element-plus'

export type FormItemType = {
    type: Component //表单组件名
    opts?: object //组件属性与方法,注意传入组件事件需加on前缀，如onClick代表原有的@click事件
    value?: any //表单组件默认值

    // query专用属性
    queryRules?: FormRules //查询区rules
    querySort?: number //字段在查询区顺序

    //layer专用属性
    layerRules?: FormRules //查询区rules
    layerSort?: number //字段在弹窗中顺序
    col?: number //用于layer中，单独指定表单项占据一行的比例，1为整行，2为50%（即一行布局两个formItem）
    required?: boolean //是否必填
}

export type ColumnType = {
    title: string
    queryTitle?: string
    layerTitle?: string
    dataIndex?: string //列表后端字段名
    queryIndex?: string //查询区字段名，应对某些接口同属性但查询字段名与列表字段名不符的情况
    merge?: boolean //该列是否执行单元格合并逻辑
    tableHidden?: boolean //不渲染在列表中
    queryHidden?: boolean //不渲染该列在列表中
    layerHidden?: boolean //不渲染该列在列表中
    customRender?: (cell: any, row: object) => any //自定义渲染逻辑
    formItem?: FormItemType
    columnType?: string //el-table-column的属性type
    columnAttr?: string //el-table-column的支持的其他属性
    grandTotalTitle?: string //总计标题
    subTotalTitle?: string //小计标题
    subTotal?: boolean //需执行统计列
}

export type Props = {
    getTableData: Function
    columns: ColumnType[]
    showIndex?: Boolean // 是否展示index选择，默认是
    showCheckbox?: Boolean // 是否展示选择框，默认否
    reserveSelection?: Boolean // 是否翻页时,保留已选择项
    showRadio?: Boolean // 是否展示单选框，默认否
    loading?: Boolean // 外部输入的loading状态,默认否
    showPage?: Boolean // 是否展示分页组件，默认否
    showAdd?: Boolean // 是否添加按钮，默认否,
    showExport?: Boolean // 是否显示导出excel按钮，默认否
    isInitData?: Boolean // 是否自动请求后台数据,默认是
    isResetQuery?: Boolean // 组价销毁是否清空查询区，默认否
    otherOptions?: Object //,通过v-bind一次绑定的表格其他属性
    selectedIds?: Array
    selectedId?: String
    select?: Array // 已选择的数据，与selection结合使用
    page?: Object
    pageLayout?: String // 分页需要显示的东西，默认全部
    pageSizes?: Array
    addBtnName?: String // 新增按钮名
    labelWidth?: String // 组件标题宽度
    indexWidth?: String // 序号列宽度
    autoHeight?: Boolean // 是否去掉height:100%这个设置,表格随内容自动调整高度
    list?: Array //表格数据
    isDelayLoading?: Boolean // 是否需要延迟加载 默认是
    excelFileName?: Boolean // excel导出文件名
    excelColInfo?: ColInfo[] // excel导出文件名
    showExportField?: Boolean // 是否开启选择Excel 导出列功能，默认false
    otherSpanMethod: Function //设置表格单元格合并逻辑
}
