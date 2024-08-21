using Microsoft.EntityFrameworkCore;

namespace EmployeesListMvc.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions options):base(options)
        {
            
        }

        public DbSet<Employee> EmployeesList { get; set; } 
    }
}
