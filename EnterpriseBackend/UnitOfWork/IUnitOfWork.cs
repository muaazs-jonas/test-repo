using EnterpriseBackend.Repositories;
using System;
using System.Threading.Tasks;

namespace EnterpriseBackend.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        // Expose repositories
        IGenericRepository<Models.User> Users { get; }
        IGenericRepository<Models.Product> Products { get; }
        
        // Save changes to the database
        Task<int> CompleteAsync();
    }
}