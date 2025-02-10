import Navigation from "./components/navigation";
import ClientLayout from "./client-layout";

export const metadata = {
  title: "todo",
  description: "next.js todo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <Navigation />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
