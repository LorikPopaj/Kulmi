using Microsoft.EntityFrameworkCore;
using Kulmi.Models;

namespace Kulmi.Data
{
    public class UserContext: DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        //public static object RefreshToken { get; internal set; }
        public DbSet<User> Users { get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
        }


    }
}
