import { uniqWith, isEqual } from 'lodash'

function columnGroup({ tableData, columns }) {
    const result = []
    for (const column of columns) {
        if (!column.tableHidden) {
            result.push(
                <el-table-column
                    prop={column.dataIndex}
                    label={$t(column.tableTitle ?? column.title)}
                    align={column.align ?? 'center'}
                    width={column.width}
                    min-width={column.minWidth}
                    fixed={column.fixed}
                    type={column.columnType || 'default'}
                    class-name={column.className}
                    show-overflow-tooltip={column.overflow}
                    filters={column.filter ? filtersHandler(tableData, column) : null}
                    filter-method={column.filter ? filterMethodHandler : null}
                    {...column.columnAttr}>
                    {{
                        default({ row, $index }) {
                            if (column.children) {
                                return columnGroup({ columns: column.children })
                            } else if (typeof column.customRender === 'function') {
                                return column.customRender(row[column.dataIndex], row, $index)
                            }
                        },
                    }}
                </el-table-column>,
            )
        }
    }

    return result
}

export default columnGroup

function filtersHandler(tableData, column) {
    return uniqWith(
        tableData.map((row) => {
            return {
                text: row[column.dataIndex],
                value: row[column.dataIndex],
            }
        }),
        isEqual,
    )
}
function filterMethodHandler(value, row, column) {
    const property = column['property']
    return row[property] == value
}
