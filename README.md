# Enterprise Backend & User Management SPA

A full-stack application consisting of a .NET 10 backend API and an Angular-based user management single-page application.

## Project Structure

- **EnterpriseBackend/**: .NET 10 REST API with Entity Framework Core
- **user-management-spa/**: Angular 19+ single-page application

## EnterpriseBackend

A robust ASP.NET Core API providing authentication, user management, and product management functionality.

### Features
- JWT-based authentication
- User role management
- Product management APIs
- SQLite database with Entity Framework Core migrations
- Generic Repository pattern with Unit of Work

### Tech Stack
- .NET 10
- ASP.NET Core
- Entity Framework Core
- SQLite
- BCrypt password hashing

### Getting Started

```bash
cd EnterpriseBackend
dotnet restore
dotnet ef database update
dotnet run
```

The API will be available at `https://localhost:5001`

### API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/users` - Get all users
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product

## User Management SPA

An Angular-based web application for managing users and viewing products.

### Features
- User authentication
- User listing and management
- Product catalog viewing
- Responsive UI

### Tech Stack
- Angular 19+
- TypeScript
- CSS

### Getting Started

```bash
cd user-management-spa
npm install
npm start
```

The application will be available at `http://localhost:4200`

## Database

The project uses SQLite for data persistence. The database file is automatically created on first run:
- Location: `EnterpriseBackend/app.db`

### Migrations

To add a new migration:

```bash
cd EnterpriseBackend
dotnet ef migrations add MigrationName
dotnet ef database update
```

## Development Workflow

This project uses **Git Flow** branching model. See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:
- Creating feature branches
- Making pull requests
- Release and hotfix procedures
- Commit message conventions

**Quick start:**
```bash
# Create a feature branch
git checkout develop
git checkout -b feature/your-feature-name

# After changes, push and create a PR to develop
git push origin feature/your-feature-name
```

## License

This project is open source and available under the MIT License.
