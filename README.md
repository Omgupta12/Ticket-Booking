# Train Seat Reservation System

## Project Demo
- Live Application:- https://seat-booking-frontend-rpi7.vercel.app
- Video Presentation:- https://drive.google.com/file/d/1JC1PKEJYtqN5haBw6N3NH_WGWqLctpdL/view?usp=sharing

## About the Project
This application allows users to reserve train seats with specific constraints:
- The train has **80 seats**, arranged as **7 seats per row** with the last row having **3 seats**.
- Users can reserve up to **7 seats in one booking**, prioritizing booking in a single row.
- Seats are assigned nearby if a single row is unavailable.
- **User authentication** is required for seat booking.
- Booked seats are locked and cannot be reserved by others unless canceled.

---

## Tech Stack
### Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind Css](https://tailwindui.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

### Database
- [PostgreSQL](https://www.postgresql.org/)

### Deployment
- Frontend - Vercel
- Backend - Render

---

## Features
- **User Authentication**: Sign Up/Login functionality.
- **Responsive Design**: Optimized for various devices.
- **Dynamic Routing**: Utilizes Next.js file-based routing.
- **Error Handling**: Proper validation and error responses.
- **Secure Bookings**: Seat locks to avoid duplicate reservations.
- **Administrative Features**: Reset seat bookings.
- **Deployment-Ready**: Compatible with cloud platforms.

---

## Installation
### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [PostgreSQL](https://www.postgresql.org/) installed and running.

### Frontend Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Ticket-Booking.git
   cd Ticket-Booking
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Start the application:
   ```bash
    npm run dev
   
### Backend Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Ticket-Booking.git
   cd Ticket-Booking
   cd backend
2. Install dependencies:
   ```bash
   npm install
3. Start the application:
   ```bash
   node server.js
   
## Screenshots

### Login Page
![Login-Page](https://github.com/user-attachments/assets/0e2c3654-031d-4107-9944-4f1610f1333d)

### Signup Page
![Booking Page](https://github.com/user-attachments/assets/1ad41039-3c7d-47ed-9711-a82d7182f659)


### Booking Page
![Booking Page](https://github.com/user-attachments/assets/4ceb5f1a-cf78-4368-bebe-f11f5365c384)


## API Endpoints
- https://seatbooking-backend-tsp2.onrender.com/api/auth/login - Login
- https://seatbooking-backend-tsp2.onrender.com/api/auth/signup - Signup
- https://seatbooking-backend-tsp2.onrender.com/api/seats - Get all seats
- https://seatbooking-backend-tsp2.onrender.com/api/seats/reset - Reset all bookings
- https://seatbooking-backend-tsp2.onrender.com/api/seats/book - Booking seats


## Best Practices Followed
- Validation: Input sanitization and validation.
- Error Handling: Graceful responses for edge cases.
- Security: Use of JWT, bcrypt, etc.
- Code Quality: Linting and adherence to coding standards.
- Modularity: Clean, reusable components and modules

## Contact
### Project Owner
- Portfolio: https://omgupta12.github.io/
- Email: omprakash1997242@gmail.com
   
