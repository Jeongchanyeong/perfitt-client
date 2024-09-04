import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-600">
      <div className="w-[375px] h-full bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
