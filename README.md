# CareTrack (in-progress)

CareTrack is a healthcare patient management application that allows patients to easily register, book, and manage their appointments with doctors. It features administrative tools for scheduling, confirming, and canceling appointments, along with SMS notifications, all built using Next.js.

## Tech Stack

- Next.js
- Appwrite
- TypeScript
- TailwindCSS
- ShadCN
- Twilio

## Features

- **Register as a Patient**: Users can sign up and create a personal profile as a patient.
- **Book a New Appointment with Doctor**: Patients can schedule appointments with doctors at their convenience and can book multiple appointments.
- **Manage Appointments on Admin Side**: Administrators can efficiently view and handle all scheduled appointments.
- **Confirm/Schedule Appointment from Admin Side**: Admins can confirm and set appointment times to ensure they are properly scheduled.
- **Cancel Appointment from Admin Side**: Administrators have the ability to cancel any appointment as needed.
- **Send SMS on Appointment Confirmation**: Patients receive SMS notifications to confirm their appointment details.
- **Complete Responsiveness**: The application works seamlessly on all device types and screen sizes.
- **File Upload Using Appwrite Storage**: Users can upload and store files securely within the app using Appwrite storage services.
- **Manage and Track Application Performance Using Sentry**: The application uses Sentry to monitor and track its performance and detect any errors.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/jiten0709/CareTrack.git
   cd care-track
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of your project and refer .env.sample file.

### Running the Project

Start the development server:

```sh
npm run dev
```
