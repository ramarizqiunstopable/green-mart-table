import ProductForm from "./components/ProductForm";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="min-h-screen  bg-gray-100">
      <h1 className="text-3xl font-bold text-green-700 p-10">
        Table Product Green Mart 🌱
      </h1>
      <div className="min-h-screen  bg-gray-100 p-10">
        <ProductForm />
      </div>
    </div>
  );
}
export default App;
