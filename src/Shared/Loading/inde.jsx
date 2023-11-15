const Loading = () => {
  return (
    <div>
      <div className="w-[100%] h-[100vh] left-[50%] z-[990] -translate-x-[50%] bg-base-100 opacity-80 fixed -mt-9">
        <div className="text-right"></div>
        <div className="flex justify-center items-center mt-[40%] md:mt-[15%] lg:mt-[18%]">
          <span className="loading loading-spinner  loading-lg text-info"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
