using EmployeesListMvc.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeesListMvc.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmployeeContext _employeeContext;

        public EmployeeController(EmployeeContext employeeContext)
        {
            this._employeeContext = employeeContext;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAll() {
            try
            {
                var result = _employeeContext.EmployeesList.ToList();
                return this.Ok(new {success=true, message="fetched all employees", data=result});
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public IActionResult AddEmp([FromBody] AddEmployeeModal employee)
        {
            Employee newEmployee = new Employee();
            newEmployee.Name = employee.name;
            newEmployee.Salary = employee.salary;
            newEmployee.Department = employee.department;

            _employeeContext.EmployeesList.Add(newEmployee);
            _employeeContext.SaveChanges();

            return this.Ok(new { success = true, message = "Employee added successfully", data = newEmployee });

        }

        [HttpGet]
        public JsonResult GetByIdEmp(int id)
        {
            var result = _employeeContext.EmployeesList.FirstOrDefault(x => x.Id == id);
            return Json(new { data = result });
        }

        [HttpPut]
        public IActionResult Update([FromBody] AddEmployeeModal model)
        {
            var empExist = _employeeContext.EmployeesList.FirstOrDefault(x => x.Id == model.Id);
            if(empExist != null)
            {
                empExist.Name = model.name;
                empExist.Salary = model.salary;
                empExist.Department = model.department;

                _employeeContext.EmployeesList.Update(empExist);
                _employeeContext.SaveChanges();

                return this.Ok(new { success = true, message = "Employee updated successfully", data = empExist });
            }
            else
            {
                return this.Ok(new { success = true, message = "failed to update", data = empExist });

            }
        }

        [HttpPost]
        public IActionResult DeleteByIdEmp(int id)
        {
            var empExist = _employeeContext.EmployeesList.FirstOrDefault(x => x.Id == id);
            if (empExist != null)
            {
                _employeeContext.EmployeesList.Remove(empExist);
                _employeeContext.SaveChanges();
            }
            return this.Ok(new { success = true, message = "employee details deleted successfully", data = empExist });
        }
            

    }
}
