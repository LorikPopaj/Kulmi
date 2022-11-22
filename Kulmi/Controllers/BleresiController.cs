using Kulmi.Models;
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
        public BleresiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select BleresiId, BleresiName, BleresiNrTel, 
                BleresiEmail , BleresiPassword

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
                (@BleresiName, @BleresiNrTel, @BleresiEmail, @BleresiPassword )
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
                BleresiPassword=@BleresiPassword
              
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
    }
}
