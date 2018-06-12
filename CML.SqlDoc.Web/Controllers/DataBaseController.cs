using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CML.SqlDoc.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CML.SqlDoc.Web.Controllers
{
    public class DataBaseController : Controller
    {
        private readonly IDataBaseConfigRespository   _dataBaseConfigRespository;

        public DataBaseController(IDataBaseConfigRespository dataBaseConfigRespository)
        {
            _dataBaseConfigRespository = dataBaseConfigRespository;
        }


        public IActionResult Index(int id = 2)
        {
            var result = _dataBaseConfigRespository.GetDatabaseTableStructure(id);
            return View(result.Value);
        }
    }
}