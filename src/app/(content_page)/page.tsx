export default function Home() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-4 h-4 bg-red-500">
          HOME
        </div>
      ))}
    </>
  );
}
