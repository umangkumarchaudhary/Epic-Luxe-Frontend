# Raam Pre-Owned Vehicle Inventory

Welcome to the Raam Pre-Owned Vehicle Inventory project! This project is designed to provide a seamless experience for users looking to explore and purchase premium pre-owned vehicles. Below is an overview of the project's structure, features, and setup instructions.

## Project Structure

```
raam-preowned
├── src
│   └── app
│       └── luxe
│           └── inventory
│               └── [slug]
│                   ├── page.server.tsx      # Server-side rendering for vehicle details
│                   ├── page.client.tsx      # Client-side interactions for vehicle details
│                   └── components
│                       ├── EMIModal.tsx      # EMI calculator component
│                       └── Schedule.tsx       # Test drive scheduling component
├── package.json                             # NPM configuration file
├── tsconfig.json                            # TypeScript configuration file
└── README.md                                # Project documentation
```

## Features

- **Server-Side Rendering**: The `page.server.tsx` file fetches vehicle data based on the slug parameter, enhancing SEO by preparing metadata for better search engine indexing.
- **Client-Side Interactions**: The `page.client.tsx` file manages user interactions, allowing users to like vehicles, share links, and open modals for EMI calculations and scheduling test drives.
- **EMI Calculator**: The `EMIModal.tsx` component provides users with an easy-to-use EMI calculator for their selected vehicle.
- **Test Drive Scheduling**: The `Schedule.tsx` component allows users to schedule a test drive for their desired vehicle.

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd raam-preowned
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Run the Development Server**:
   ```
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for using the Raam Pre-Owned Vehicle Inventory project! We hope you enjoy exploring our premium pre-owned vehicles.