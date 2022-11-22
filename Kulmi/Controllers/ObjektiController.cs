using Kulmi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Kulmi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObjektiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public ObjektiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select ObjektiEmri, ObjektiFoto, ObjektiQyteti, 
                ObjektiLagjja , ObjektiLloji, ObjektiStatusi, ObjektiShitesi,
                ObjektiNrIDhomave, ObjektiBanjo, ObjektiSize

                from Objekti
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Objekti ob)
        {
            string query = @"
                insert into Objekti
                values
                (@ObjektiEmri, @ObjektiFoto, @ObjektiQyteti, 
                @ObjektiLagjja , @ObjektiLloji, @ObjektiStatusi, @ObjektiShitesi,
                @ObjektiNrIDhomave, @ObjektiBanjo, @ObjektiSize)
                                                                                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@ObjektiEmri", ob.ObjektiEmri);
                    myCommand.Parameters.AddWithValue("@ObjektiFoto", ob.ObjektiFoto);
                    myCommand.Parameters.AddWithValue("@ObjektiLagjja", ob.ObjektiLagjja) ;
                    myCommand.Parameters.AddWithValue("@ObjektiQyteti", ob.ObjektiQyteti);
                    myCommand.Parameters.AddWithValue("@ObjektiLloji", ob.ObjektiLloji);
                    myCommand.Parameters.AddWithValue("@ObjektiStatusi", ob.ObjektiStatusi);
                    myCommand.Parameters.AddWithValue("@ObjektiShitesi", ob.ObjektiShitesi);
                    myCommand.Parameters.AddWithValue("@ObjektiNrIDhomave", ob.ObjektiNrIDhomave);
                    myCommand.Parameters.AddWithValue("@ObjektiBanjo", ob.ObjektiBanjo);
                    myCommand.Parameters.AddWithValue("@ObjektiSize", ob.ObjektiSize);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Objekti ob)
        {
            string query = @"
                update Objekti
                set ObjektiEmri= @ObjektiEmri,
                ObjektiFoto=@ObjektiFoto,
                ObjektiLagjja=@ObjektiLagjja,
                ObjektiQyteti=@ObjektiQyteti,
                ObjektiLloji=@ObjektiLloji,
                ObjektiStatusi=@ObjektiStatusi,
                ObjektiShitesi=@ObjektiShitesi,
                ObjektiNrIDhomave=@ObjektiNrIDhomave,
                ObjektiBanjo=@ObjektiBanjo,
                ObjektiSize=@ObjektiSize
               

                where ObjektiId=@ObjektiId
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@ObjektiId", ob.ObjektiId);
                    myCommand.Parameters.AddWithValue("@ObjektiEmri", ob.ObjektiEmri);
                    myCommand.Parameters.AddWithValue("@ObjektiFoto", ob.ObjektiFoto);
                    myCommand.Parameters.AddWithValue("@ObjektiLagjja", ob.ObjektiLagjja);
                    myCommand.Parameters.AddWithValue("@ObjektiQyteti", ob.ObjektiQyteti);
                    myCommand.Parameters.AddWithValue("@ObjektiLloji", ob.ObjektiLloji);
                    myCommand.Parameters.AddWithValue("@ObjektiStatusi", ob.ObjektiStatusi);
                    myCommand.Parameters.AddWithValue("@ObjektiShitesi", ob.ObjektiShitesi);
                    myCommand.Parameters.AddWithValue("@ObjektiNrIDhomave", ob.ObjektiNrIDhomave);
                    myCommand.Parameters.AddWithValue("@ObjektiBanjo", ob.ObjektiBanjo);
                    myCommand.Parameters.AddWithValue("@ObjektiSize", ob.ObjektiSize);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Upadted Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from Objekti
                where ObjektiId=@ObjektiId
    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@ObjektiId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }


    }
}
