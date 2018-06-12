using CML.SqlDoc.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CML.SqlDoc.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IDataBaseConfigRespository _dataBaseConfigRespository;

        public HomeController(IDataBaseConfigRespository dataBaseConfigRespository)
        {
            _dataBaseConfigRespository = dataBaseConfigRespository;
        }


        // GET: Home
        public ActionResult Index()
        {
            var result = _dataBaseConfigRespository.GetDatabaseConfigs();
            return View(result.Value);
        }

        public ActionResult Welcome()
        {
            return View();
        }
    }
}