const Layout = ({children}) => {
  return (
    <div className="flex flex-col items-center py-20 bg-gray-50 h-screen">
      {children}
    </div>
  )
};

export { Layout };
