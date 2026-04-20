# Staff Management System - Frontend

An Angular 14.2.6 frontend application for managing staff, leave requests, and attendance.

## Features

- User authentication with JWT tokens
- Staff management (CRUD operations)
- Leave request management (request, approve, reject)
- Dashboard with key statistics
- Staff profiles and details
- Attendance tracking
- Role-based access control
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Angular CLI v14.2.6

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development Server

Run the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

## Building for Production

Build the project for production:
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Backend Connection

The frontend is configured to connect to the backend API at `http://localhost:8000/api`. 

To change the API URL, edit:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

## Project Structure

```
src/
├── app/
│   ├── components/          # Angular components
│   │   ├── dashboard/       # Dashboard component
│   │   ├── staff-list/      # Staff listing component
│   │   ├── staff-detail/    # Staff detail view component
│   │   ├── staff-form/      # Staff add/edit form
│   │   ├── leave-list/      # Leave requests listing
│   │   ├── leave-form/      # Leave request form
│   │   ├── login/           # Login component
│   │   └── navbar/          # Navigation bar component
│   ├── services/            # Angular services
│   │   ├── auth.service.ts
│   │   ├── staff.service.ts
│   │   ├── leave.service.ts
│   │   ├── attendance.service.ts
│   │   └── auth.interceptor.ts
│   ├── guards/              # Route guards
│   │   └── auth.guard.ts
│   ├── models/              # TypeScript interfaces
│   │   └── models.ts
│   ├── app.module.ts        # Root module
│   ├── app-routing.module.ts # Routing configuration
│   ├── app.component.ts     # Root component
│   └── app.component.html   # Root template
├── assets/                  # Static assets
├── environments/            # Environment configurations
├── styles.scss             # Global styles
├── index.html              # HTML entry point
└── main.ts                 # Application entry point
```

## Authentication

The application uses JWT (JSON Web Token) based authentication. Tokens are stored in memory during the session.

## API Endpoints

The application expects the following API endpoints from the backend:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

- `GET /api/staff` - List all staff
- `GET /api/staff/<id>` - Get staff details
- `POST /api/staff` - Create new staff
- `PUT /api/staff/<id>` - Update staff
- `DELETE /api/staff/<id>` - Delete staff

- `GET /api/leaves` - List leave requests
- `GET /api/leaves/<id>` - Get leave request details
- `POST /api/leaves` - Create leave request
- `POST /api/leaves/<id>/approve` - Approve leave request
- `POST /api/leaves/<id>/reject` - Reject leave request

- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/check-in` - Check in
- `POST /api/attendance/check-out` - Check out

- `GET /api/dashboard/stats` - Get dashboard statistics

## Styling

The application uses SCSS for styling with a custom color scheme:

- Primary: #2b6cb0 (Blue)
- Accent: #38a169 (Green)
- Danger: #e53e3e (Red)
- Warning: #ecc94b (Yellow)

## Contributing

Contributions are welcome. Please follow the Angular style guide and ensure all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License.
