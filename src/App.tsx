import ProductTable from "./components/tableProduct";

function App() {
  return (
    <div className="min-h-screen  bg-gray-100">
      <h1 className="text-3xl font-bold text-green-700 p-10">
        Table Product Green Mart 🌱
      </h1>
      <div className="min-h-screen  bg-gray-100 p-10">
        <ProductTable />
      </div>
    </div>
  );
}
export default App;
