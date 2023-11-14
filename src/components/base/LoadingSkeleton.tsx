export const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <p className="font-thin">Carregando...</p>
      <div className="flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="bg-primary-400 h-4 w-3/4 rounded"></div>
          <div className="space-y-2">
            <div className="bg-primary-400 h-4 w-5/6 rounded"></div>
            <div className="bg-primary-400 h-4 w-5/6 rounded"></div>
            <div className="bg-primary-400 h-4 rounded"></div>
            <div className="bg-primary-400 h-4 rounded"></div>
            <div className="bg-primary-400 h-4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
