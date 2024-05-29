function Error() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/25 flex items-center justify-center z-[10000]">
      <div className="w-[20%] h-[20%] bg-white rounded-xl flex justify-center items-center gap-2">
        <img src="/remove.png" alt="" className="w-[25px]" />
        <h1 className="">Something went wrong</h1>
      </div>
    </div>
  );
}

export default Error;
