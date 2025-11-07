// src/components/MainLayout.jsx
function MainLayout({ children }) {
  return (
    <div className="main-layout w-full xl:w-[80%] mx-auto px-4 bg-gray-600 sm:px-6 lg:px-8 xl:px-0">
      {children}
    </div>
  );
}

export default MainLayout;
