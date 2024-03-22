namespace EmployeeManagementSystem.Models
{
    public class UserConstants
    {
        public static List<UserModel> Users = new List<UserModel>()
        {
            new UserModel() { Username = "ebadkhan", EmailAddress = "ebad.admin@email.com", Password = "password123", GivenName = "Ebad", Surname = "Khan", Role = "Administrator" },
        };
    }
}
