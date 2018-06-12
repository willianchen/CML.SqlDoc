using CML.DataAccess;
using CML.DataAccess.DbClient;
using CML.DataAccess.Repositories;
using CML.DataAccess.Utils;
using CML.Lib.Configurations;
using CML.Lib.Result;
using CML.SqlDoc.Domain;
using CML.SqlDoc.Trans.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CML.SqlDoc.Repository.Implement
{
    /// <summary>
    /// Copyright (C) 2017 cml 版权所有。
    /// 类名：DataBaseConfigRespository.cs
    /// 类属性：公共类（非静态）
    /// 类功能描述：DataBaseConfigRespository
    /// 创建标识：cml 2018/3/1 10:53:25
    /// </summary>
    public class DataBaseConfigRespository : BaseDataRepository<DataBaseConfig>, IDataBaseConfigRespository
    {
        /// <summary>
        /// 配置项
        /// </summary>
        private const string DatabaseKey = "DataBaseConfig";

        /// <summary>
        /// 构造函数
        /// tablename configName参数暂无
        /// 后期从数据库读取时另行配置
        /// </summary>
        /// <param name="dataAccessFactory"></param>
        public DataBaseConfigRespository(IDataAccessFactory dataAccessFactory) : base(dataAccessFactory, "", "SqlDoc")
        {

        }

        public OperateResult<List<DataBaseConfig>> GetDatabaseConfigs()
        {
            return OperateUtil.Execute(() =>
            {
                return ConfigurationHelper.GetAppSettings<List<DataBaseConfig>>(DatabaseKey);
            }, callMemberName: "DataBaseConfigRespository-GetDatabaseConfigs");
        }

        public OperateResult<IEnumerable<TableStructureDto>> GetDatabaseTableStructure(int dbId)
        {
            return OperateUtil.Execute(() =>
            {
                var dbInfo = GetDatabaseConfigs().Value.Find(x => x.Id == dbId);
                if (dbInfo != null && !string.IsNullOrWhiteSpace(dbInfo.ConnectionString) && !string.IsNullOrWhiteSpace(dbInfo.DbType))
                {
                    var dbType = Enum.Parse<DatabaseType>(dbInfo.DbType);
                    var selectTableListSql = SqlQueryUtil.GetQueryTableListSql(dbType, dbInfo.DbName);
                    var selectTableColumnListSql = SqlQueryUtil.GetQueryTableColumnListSql(dbType, dbInfo.DbName);
                    using (var dataAccess = DataAccessFactory.GetDataAccess(dbType, dbInfo.ConnectionString, false))
                    {
                        var tableSqlquery = new SqlQuery(selectTableListSql);
                        var tableList = dataAccess.Query<TableStructureDto>(tableSqlquery);
                        var tableColumnSqlQuery = new SqlQuery(selectTableColumnListSql);
                        var tableColumnList = dataAccess.Query<TableColumnStructureDto>(tableColumnSqlQuery);
                        foreach (var item in tableList)
                        {
                            item.ColumnList = tableColumnList.Where(m => m.TableName == item.TableName);
                        }
                        return tableList;
                    }
                }
                return null;
            }, callMemberName: "DataBaseConfigRespository-GetDatabaseTableStructure");
        }
    }
}
