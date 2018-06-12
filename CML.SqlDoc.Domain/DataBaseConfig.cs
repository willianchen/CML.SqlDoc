using System;

namespace CML.SqlDoc.Domain
{
    /// <summary>
    /// 数据结构配置类
    /// </summary>
    public class DataBaseConfig
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string ConnectionString { get; set; }

        public string DbType { get; set; }

        public string DbName { get; set; }
    }
}
