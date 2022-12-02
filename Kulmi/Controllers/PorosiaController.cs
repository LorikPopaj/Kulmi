using Kulmi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Kulmi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PorosiaController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PorosiaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select PorosiaId, ObjektiName, BleresiName, 
                BleresiEmail , PorosiaKoment

                from Porosia
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
        public JsonResult Post(Porosia po)
        {
            string query = @"
                insert into Porosia
                values
                (@ObjektiName, @BleresiName, @BleresiEmail, @PorosiaKoment )
                                                                                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {


                    myCommand.Parameters.AddWithValue("@ObjektiName", po.ObjektiName);
                    myCommand.Parameters.AddWithValue("@BleresiName", po.BleresiName);
                    myCommand.Parameters.AddWithValue("@BleresiEmail", po.BleresiEmail);
                    myCommand.Parameters.AddWithValue("@PorosiaKoment", po.PorosiaKoment);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Porosia po)
        {
            string query = @"
                update Porosia
                set ObjektiName= @ObjektiName,
                BleresiName=@BleresiName,
                BleresiEmail=@BleresiEmail,
                PorosiaKoment=@PorosiaKoment
              
                where PorosiaId=@PorosiaId
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@PorosiaId", po.PorosiaId);
                    myCommand.Parameters.AddWithValue("@BleresiName", po.BleresiName);
                    myCommand.Parameters.AddWithValue("@ObjektiName", po.ObjektiName);
                    myCommand.Parameters.AddWithValue("@BleresiEmail", po.BleresiEmail);
                    myCommand.Parameters.AddWithValue("@PorosiaKoment", po.PorosiaKoment);

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
                delete from Porosia
                where PorosiaId=@PorosiaId
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@PorosiaId", id);
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