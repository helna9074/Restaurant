type Props = {
  columns: number;
  rows?: number;
};

export const SkeletonTable = ({ columns, rows = 5 }: Props) => {
  return (
    <div className="w-full p-3">
      <div className="border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid border-b  bg-slate-500" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="p-3">
              <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid border-b"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="p-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};