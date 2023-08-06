export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
      }}
    >
      {children}
    </div>
  );
}
