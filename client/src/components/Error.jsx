function Error() {
  return (
    // Overlay covering the entire screen to prevent interactions while showing the error
    <div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/25 flex items-center justify-center z-[10000]">
      {/* Container for the error message */}
      <div className="w-[20%] h-[20%] bg-white rounded-xl flex justify-center items-center gap-2">
        {/* Image indicating error */}
        <img src="/remove.png" alt="" className="w-[25px]" />
        {/* Text indicating error */}
        <h1 className="">Something went wrong</h1>
      </div>
    </div>
  );
}

// Export the Error component
export default Error;
