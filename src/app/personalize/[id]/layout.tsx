export default function PersonalizeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-white">
        {children}
      </div>
    );
  }