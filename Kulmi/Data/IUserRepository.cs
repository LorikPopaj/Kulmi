using Kulmi.Models;

namespace Kulmi.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);

    }
}
