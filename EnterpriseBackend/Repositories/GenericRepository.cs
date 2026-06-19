using EnterpriseBackend.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EnterpriseBackend.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly AppDbContext _context;
        internal DbSet<T> dbSet;

        public GenericRepository(AppDbContext context)
        {
            _context = context;
            this.dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync() => await dbSet.ToListAsync();
        
        public async Task<T?> GetByIdAsync(int id) => await dbSet.FindAsync(id);
        
        public async Task AddAsync(T entity) => await dbSet.AddAsync(entity);
        
        public void Update(T entity) => dbSet.Update(entity);
        
        public void Delete(T entity) => dbSet.Remove(entity);
    }
}