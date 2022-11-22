using Kulmi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Kulmi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfertatController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public OfertatController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select ObjektiFoto, ObjektiQyteti, 
                ObjektiLagjja , ObjektiLloji, ObjektiStatusi, ObjektiShitesi,
                ObjektiNrIDhomave, ObjektiBanjo, ObjektiSize, Zbritja

                from Ofertat
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
        public JsonResult Post(Ofertat of)
        {
            string query = @"
                insert into Ofertat
                values
                (@ObjektiFoto, @ObjektiQyteti, 
                @ObjektiLagjja , @ObjektiLloji, @ObjektiStatusi, @ObjektiShitesi,
                @ObjektiNrIDhomave, @ObjektiBanjo, @ObjektiSize, @Zbritja)
                                                                                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {


                    myCommand.Parameters.AddWithValue("@ObjektiFoto", of.ObjektiFoto);
                    myCommand.Parameters.AddWithValue("@ObjektiLagjja", of.ObjektiLagjja);
                    myCommand.Parameters.AddWithValue("@ObjektiQyteti", of.ObjektiQyteti);
                    myCommand.Parameters.AddWithValue("@ObjektiLloji", of.ObjektiLloji);
                    myCommand.Parameters.AddWithValue("@ObjektiStatusi", of.ObjektiStatusi);
                    myCommand.Parameters.AddWithValue("@ObjektiShitesi", of.ObjektiShitesi);
                    myCommand.Parameters.AddWithValue("@ObjektiNrIDhomave", of.ObjektiNrIDhomave);
                    myCommand.Parameters.AddWithValue("@ObjektiBanjo", of.ObjektiBanjo);
                    myCommand.Parameters.AddWithValue("@ObjektiSize", of.ObjektiSize);
                    myCommand.Parameters.AddWithValue("@Zbritja", of.Zbritja);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Ofertat of)
        {
            string query = @"
                update Ofertat
                set
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

                    myCommand.Parameters.AddWithValue("@ObjektiId", of.ObjektiId);
                    myCommand.Parameters.AddWithValue("@ObjektiFoto", of.ObjektiFoto);
                    myCommand.Parameters.AddWithValue("@ObjektiLagjja", of.ObjektiLagjja);
                    myCommand.Parameters.AddWithValue("@ObjektiQyteti", of.ObjektiQyteti);
                    myCommand.Parameters.AddWithValue("@ObjektiLloji", of.ObjektiLloji);
                    myCommand.Parameters.AddWithValue("@ObjektiStatusi", of.ObjektiStatusi);
                    myCommand.Parameters.AddWithValue("@ObjektiShitesi", of.ObjektiShitesi);
                    myCommand.Parameters.AddWithValue("@ObjektiNrIDhomave", of.ObjektiNrIDhomave);
                    myCommand.Parameters.AddWithValue("@ObjektiBanjo", of.ObjektiBanjo);
                    myCommand.Parameters.AddWithValue("@ObjektiSize", of.ObjektiSize);
                    myCommand.Parameters.AddWithValue("@Zbritja", of.Zbritja);

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
                delete from Ofertat
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
