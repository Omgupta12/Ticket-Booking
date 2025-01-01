import "./globals.css";

export const metadata = {
  title: "Seat Booking App",
  description: "A seat booking application using Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto mt-8">{children}</main>
      </body>
    </html>
  );
}
