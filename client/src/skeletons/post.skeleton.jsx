export default function PostSkeletion() {
  return (
    <div className="w-full flex flex-col gap-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="flex flex-col w-full gap-3">
          <div className="h-6 bg-gray-200 w-full rounded-md" />
          <div className="h-10 bg-gray-200 w-full rounded-md" />
          <div className="h-[150px] bg-gray-200 w-full rounded-md" />
          <div className="h-6 bg-gray-200 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
