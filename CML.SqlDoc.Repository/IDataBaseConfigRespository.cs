using CML.DataAccess.Repositories;
using CML.Lib.Result;
using CML.SqlDoc.Domain;
using CML.SqlDoc.Trans.Dto;
using System.Collections.Generic;

namespace CML.SqlDoc.Repository
{
    public interface IDataBaseConfigRespository : IBaseDataRepository<DataBaseConfig>
    {
        OperateResult<List<DataBaseConfig>> GetDatabaseConfigs();

        OperateResult<IEnumerable<TableStructureDto>> GetDatabaseTableStructure(int dbId);
    }
}
