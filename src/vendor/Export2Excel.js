import * as XLSX from 'xlsx/xlsx.mjs'
import { saveAs } from 'file-saver'

function datenum (v, date1904) {
  if (date1904) v += 1462
  const epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 1000)
}

function WorkBook () {
  const workBook = {
    SheetNames: [],
    Sheets: {}
  }
  return workBook
}

// 定义表格内容规格的大小
function sheetFromArrayOfArrays (data, opts) {
  const ws = {}
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      const cell = {
        v: data[R][C]
      }
      if (cell.v == null) continue
      // 定义单元格的规格大小
      const cellRef = XLSX.utils.encode_cell({
        c: C,
        r: R
      })
      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cellRef] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

function s2ab (s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

export function exportJsonToExcel ({
  multiHeader = [],
  header,
  data,
  fileName,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
} = {}) {
  fileName = fileName || 'excel-list'
  data = [...data]
  data.unshift(header)
  for (let i = multiHeader.length - 1; i >= 0; i--) {
    data.unshift(multiHeader[i])
  }
  const wsName = 'sheetJs'
  const wb = new WorkBook()
  const ws = sheetFromArrayOfArrays(data)
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }
  if (autoWidth) {
    const colWidth = data.map(row =>
      row.map(val => {
        if (val == null) {
          return {
            wch: 10
          }
          // 判断是否为中文，是则留两个空格
        } else if (val.toString().charCodeAt(0) > 255) {
          return {
            wch: val.toString().length * 2
          }
        } else {
          return {
            wch: val.toString().length
          }
        }
      })
    )
    // 以第一行表头宽度为基准
    const result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        // 如果有一个单元格的宽度比当列表头宽度大，则当列宽度为该行宽度
        if (result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch
        }
      }
    }
    ws['!cols'] = result
  }
  wb.SheetNames.push(wsName)
  wb.Sheets[wsName] = ws
  const wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }), `${fileName}.${bookType}`)
}
