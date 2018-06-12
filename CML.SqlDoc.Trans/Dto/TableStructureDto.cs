using System;
using System.Collections.Generic;
using System.Text;

namespace CML.SqlDoc.Trans.Dto
{
    /// <summary>
    /// Copyright (C) 2017 cml 版权所有。
    /// 类名：TableStructureDto.cs
    /// 类属性：公共类（非静态）
    /// 类功能描述：TableStructureDto
    /// 创建标识：cml 2018/3/1 10:44:56
    /// </summary>
    public class TableStructureDto
    {
        /// <summary>
        /// 表名
        /// </summary>
        public string TableName { get; set; }

        /// <summary>
        /// 说明
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 列信息列表
        /// </summary>
        public IEnumerable<TableColumnStructureDto> ColumnList { get; set; }
    }
}