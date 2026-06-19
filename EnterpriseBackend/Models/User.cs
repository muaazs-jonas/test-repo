namespace EnterpriseBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        
        // Add this line
        public string Role { get; set; } = "User"; 
    }
}