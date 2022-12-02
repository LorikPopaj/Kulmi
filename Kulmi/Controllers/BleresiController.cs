using Kulmi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Kulmi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BleresiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public BleresiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select BleresiId, BleresiName, BleresiNrTel, 
                BleresiEmail , BleresiPassword, BleresiPic

                from Bleresi
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
        public JsonResult Post(Bleresi bl)
        {
            string query = @"
                insert into Bleresi
                values
                (@BleresiName, @BleresiNrTel, @BleresiEmail, @BleresiPassword, @BleresiPic )
                                                                               ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {


                    myCommand.Parameters.AddWithValue("@BleresiName", bl.BleresiName);
                    myCommand.Parameters.AddWithValue("@BleresiNrTel", bl.BleresiNrTel);
                    myCommand.Parameters.AddWithValue("@BleresiEmail", bl.BleresiEmail);
                    myCommand.Parameters.AddWithValue("@BleresiPassword", bl.BleresiPassword);
                    myCommand.Parameters.AddWithValue("@BleresiPic", bl.BleresiPic);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Bleresi bl)
        {
            string query = @"
                update Bleresi
                set BleresiName= @BleresiName,
                BleresiNrTel=@BleresiNrTel,
                BleresiEmail=@BleresiEmail,
                BleresiPassword=@BleresiPassword,
                BleresiPic=@BleresiPic
              
                where BleresiId=@BleresiId
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@BleresiId", bl.BleresiId);
                    myCommand.Parameters.AddWithValue("@BleresiName", bl.BleresiName);
                    myCommand.Parameters.AddWithValue("@BleresiNrTel", bl.BleresiNrTel);
                    myCommand.Parameters.AddWithValue("@BleresiEmail", bl.BleresiEmail);
                    myCommand.Parameters.AddWithValue("@BleresiPassword", bl.BleresiPassword);
                    myCommand.Parameters.AddWithValue("@BleresiPic", bl.BleresiPic);

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
                delete from Bleresi
                where BleresiId=@BleresiId
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@BleresiId", id);
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

        [HttpGet("{BleresiEmail}/{BleresiPassword}")]
        public JsonResult SessionStart(string BleresiEmail, string BleresiPassword)
        {
            string query = @"
            select BleresiId, BleresiName, BleresiNrTel, 
                BleresiEmail , BleresiPassword, BleresiPic

                from Bleresi where Username = @Username and UPassword = @Upassword";

            DataTable dt = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@BleresiEmail", BleresiEmail);
                    myCommand.Parameters.AddWithValue("@BleresiPassword", BleresiPassword);

                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(dt);
        }


    }
}
