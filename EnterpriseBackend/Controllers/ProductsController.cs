using EnterpriseBackend.Models;
using EnterpriseBackend.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net; // Required for HtmlEncode

namespace EnterpriseBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _unitOfWork.Products.GetAllAsync();
            return Ok(products.OrderByDescending(p => p.Price));
        }

        // Lock down product creation to logged-in users only!
        [Authorize] 
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] ProductCreateDto dto)
        {
            // 1. Validation is automatically handled by the [ApiController] attribute, 
            // but we can add extra logic here if needed.

            // 2. Sanitization: Strip trailing spaces and encode HTML tags to prevent XSS
            var sanitizedName = WebUtility.HtmlEncode(dto.Name.Trim());
            var sanitizedDescription = string.IsNullOrWhiteSpace(dto.Description) 
                ? null 
                : WebUtility.HtmlEncode(dto.Description.Trim());

            // 3. Map the DTO to the real Database Model
            var newProduct = new Product
            {
                Name = sanitizedName,
                Price = dto.Price,
                Description = sanitizedDescription
            };

            // 4. Save to database (EF Core automatically uses Parameterized Queries to prevent SQL Injection!)
            await _unitOfWork.Products.AddAsync(newProduct);
            await _unitOfWork.CompleteAsync(); 

            return CreatedAtAction(nameof(GetProducts), new { id = newProduct.Id }, newProduct);
        }
    }
}