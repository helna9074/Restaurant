export const PaginationSkeleton = () => {
  return (
    <div className="flex items-center gap-3 p-3 ms-auto ">
   {/* Prev */}
      <button 
     
      className='px-3 w-20 h-10 border border-border rounded-lg bg-gray-400 animate-pulse'></button>
      {/* pageindicator */}
      <span className="px-3 w-10 h-10 border border-border rounded-lg bg-gray-400 animate-pulse"></span>
      <button
      
      className='px-3 w-20 h-10 border border-border rounded-lg bg-gray-400 animate-pulse'></button>
    </div>
      
    
  );
};