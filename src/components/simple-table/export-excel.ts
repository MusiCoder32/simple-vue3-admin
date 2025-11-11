import { utils as xUtils, writeFile } from 'xlsx-js-style'

export default async function (table, excelFileName, excelColInfo, openSelect, showExportField, field) {
    const fileName = (excelFileName || dayjs().format('YYYY-MM-DD')) + '.xlsx'
    const tableHeader = table.$el.querySelector('.el-table__header').cloneNode(true)
    const tableBody = table.$el.querySelector('.el-table__body').cloneNode(true)
    let rows = tableBody.querySelectorAll('tbody tr')

    //处理勾选行导出
    if (openSelect) {
        // 获取表格的所有行
        // 遍历每一行
        rows.forEach((row) => {
            // 检查是否包含 is-checked 类
            const isChecked = row.querySelector('.is-checked')
            if (!isChecked) {
                // 执行后，会在tableBody中移除该行
                row.remove()
            }
        })
        rows = tableBody.querySelectorAll('tbody tr')
        if (rows.length == 0) {
            return
        }
    }
    //处理勾选列导出
    if (showExportField) {
        const ths = tableHeader.querySelectorAll('tr th') // 获取所有 th

        // 找到文本内容与数组一致的 th
        const cellIndexArr = Array.from(ths)
            .filter((th) => field.includes(th.textContent.trim()))
            .map((th) => th.cellIndex)

        ths.forEach((th) => {
            if (!field.includes(th.textContent.trim())) {
                th.remove()
            }
        })

        rows.forEach((row) => {
            const tds = row.querySelectorAll('td')
            tds.forEach((td, index) => {
                console.log(td.cellIndex)
                if (!cellIndexArr.includes(index)) {
                    td.remove()
                }
            })
        })
    }
    // 准备转excel
    const ws = xUtils.table_to_sheet(tableHeader)
    Object.keys(ws).forEach((key) => {
        if (!key.includes('!')) {
            ws[key].s = { font: { bold: true } }
        }
    })
    xUtils.sheet_add_dom(ws, tableBody, { origin: -1 })

    const boldRow = []

    Object.keys(ws).forEach((key) => {
        if (!key.includes('!')) {
            if (ws[key].s) {
                ws[key].s = {
                    font: { name: '宋体', sz: 16, bold: true },
                    alignment: {
                        horizontal: 'center',
                        vertical: 'center',
                    },
                }
            } else {
                ws[key].s = {
                    font: { name: '宋体', sz: 14 },
                    alignment: {
                        horizontal: 'center',
                        vertical: 'center',
                    },
                }
                const row = key.slice(1)
                if (ws[key].v === '小计' || ws[key].v === '总计') {
                    boldRow.push(row)
                    ws[key].s.font.bold = true
                } else if (boldRow.includes(row)) {
                    ws[key].s.font.bold = true
                }
            }
        }
    })
    ws['!cols'] = excelColInfo
    const wb = xUtils.book_new()
    xUtils.book_append_sheet(wb, ws)
    writeFile(wb, fileName, { cellStyles: true })
}
