const Nav = () => {
  return (
    <nav className="z-10 fixed w-full">
      <div className="container mx-auto py-4 flex justify-between">
        <h1 className="font-extended text-white font-bold text-5xl">R</h1>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
