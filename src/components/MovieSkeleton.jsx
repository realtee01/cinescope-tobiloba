const MovieSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse shadow-lg h-[400px]">
      {/* This simulates the Movie Poster image area */}
      <div className="w-full h-[300px] bg-gray-700"></div>
      
      {/* This simulates the Title and Date text area */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
