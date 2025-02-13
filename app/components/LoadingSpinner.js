const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center"> 
        <div className="w-20 h-20 flex items-center justify-center">
          <img
            src="/images/loading.gif" 
            alt="Loading..."
            className="max-w-full max-h-full object-contain"
          />
        </div> 
      </div>
    </div>
  );
};

export default LoadingSpinner;
