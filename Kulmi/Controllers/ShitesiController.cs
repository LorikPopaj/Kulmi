using Kulmi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Kulmi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShitesiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ShitesiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select ShitesiId, ShitesiName, ShitesiNrTel, 
                ShitesiEmail , ShitesiPassword, ShitesiRating

                from Shitesi
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
        public JsonResult Post(Shitesi sh)
        {
            string query = @"
                insert into Shitesi
                values
                (@ShitesiName, @ShitesiNrTel, @ShitesiEmail, @ShitesiPassword, @ShitesiRating )
                                                                                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {


                    myCommand.Parameters.AddWithValue("@ShitesiName", sh.ShitesiName);
                    myCommand.Parameters.AddWithValue("@ShitesiNrTel", sh.ShitesiNrTel);
                    myCommand.Parameters.AddWithValue("@ShitesiEmail", sh.ShitesiEmail);
                    myCommand.Parameters.AddWithValue("@ShitesiPassword", sh.ShitesiPassword);
                    myCommand.Parameters.AddWithValue("@ShitesiRating", sh.ShitesiRating);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Shitesi sh)
        {
            string query = @"
                update Shitesi
                set ShitesiName= @ShitesiName,
                ShitesiNrTel=@ShitesiNrTel,
                ShitesiEmail=@ShitesiEmail,
                ShitesiPassword=@ShitesiPassword,
                ShitesiRating=@ShitesiRating
              
                where ShitesiId=@ShitesiId
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@ShitesiId", sh.ShitesiId);
                    myCommand.Parameters.AddWithValue("@ShitesiName", sh.ShitesiName);
                    myCommand.Parameters.AddWithValue("@ShitesiNrTel", sh.ShitesiNrTel);
                    myCommand.Parameters.AddWithValue("@ShitesiEmail", sh.ShitesiEmail);
                    myCommand.Parameters.AddWithValue("@ShitesiPassword", sh.ShitesiPassword);
                    myCommand.Parameters.AddWithValue("@ShitesiRating", sh.ShitesiRating);

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
                delete from Shitesi
                where ShitesiId=@ShitesiId
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@ShitesiId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
