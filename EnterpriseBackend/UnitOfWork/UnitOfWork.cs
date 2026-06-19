using EnterpriseBackend.Data;
using EnterpriseBackend.Repositories;
using System.Threading.Tasks;

namespace EnterpriseBackend.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public IGenericRepository<Models.User> Users { get; private set; }
        public IGenericRepository<Models.Product> Products { get; private set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Users = new GenericRepository<Models.User>(_context);
            Products = new GenericRepository<Models.Product>(_context);
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}