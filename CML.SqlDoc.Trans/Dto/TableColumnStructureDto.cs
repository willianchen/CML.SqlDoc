using System;
using System.Collections.Generic;
using System.Text;

namespace CML.SqlDoc.Trans.Dto
{
    /// <summary>
    /// Copyright (C) 2017 cml 版权所有。
    /// 类名：TableColumnStructureDto.cs
    /// 类属性：公共类（非静态）
    /// 类功能描述：TableColumnStructureDto
    /// 创建标识：cml 2018/3/1 10:44:24
    /// </summary>
    public class TableColumnStructureDto
    {
        /// <summary>
        /// 表名
        /// </summary>
        public string TableName { get; set; }

        /// <summary>
        /// 表Id
        /// </summary>
        public int TableId { get; set; }

        /// <summary>
        /// 列名字
        /// </summary>
        public string ColumnName { get; set; }

        /// <summary>
        /// 数据类型
        /// </summary>
        public string DataType { get; set; }

        /// <summary>
        /// 最大长度
        /// </summary>
        public long MaxLength { get; set; }

        /// <summary>
        /// 列说明
        /// </summary>
        public string ColumnDescription { get; set; }

        /// <summary>
        /// 列默认值
        /// </summary>
        public string ColumnDefaultValue { get; set; }

        /// <summary>
        /// 是否可空
        /// </summary>
        public int IsNullable { get; set; }

        /// <summary>
        /// 是否为主键
        /// </summary>
        public int IsKey { get; set; }

        /// <summary>
        /// 是否自增
        /// </summary>
        public int IsIdentity { get; set; }
    }
}