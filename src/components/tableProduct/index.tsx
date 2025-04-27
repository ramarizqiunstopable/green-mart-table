import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Input } from "../ui/input";
import { useProductLogic } from "./hooks/useProductLogic";
import AlertDialogHapusProduct from "./components/AlertDialogHapusProduct";
import AlertDialogHapusGambar from "./components/AlertDialogHapusGambar";
import { Alert, AlertDescription } from "../ui/alert";

export default function ProductTable() {
  const {
    products,
    addProduct,
    removeProduct,
    addCategory,
    removeCategory,
    handleChange,
    handleCategoryChange,
    handleImage,
    handleRemoveImage,
    confirmProductIndex,
    setConfirmProductIndex,
    confirmCategoryIndex,
    setConfirmCategoryIndex,
    maxCategories,
    maxProducts,
  } = useProductLogic();

  return (
    <div className="p-4">
      <Table className="border striped">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Gambar Kategori</TableHead>
            <TableHead>Aksi Kategori</TableHead>
            <TableHead>Aksi Produk</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <Input
                  className="border px-2 py-1 w-full rounded"
                  value={product.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                  placeholder="Nama Produk"
                />
              </TableCell>
              <TableCell>
                {product.categories.map((category, j) => (
                  <div key={j} className="flex items-center gap-2 mb-2 mt-2">
                    <Input
                      className="border px-2 py-1 w-full rounded"
                      value={category.name}
                      onChange={(e) => {
                        handleCategoryChange(i, j, e.target.value);
                      }}
                      placeholder="Nama kategori"
                    />
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {product.categories.map((category, j) => (
                  <div key={j} className="flex items-center gap-2 mb-2">
                    {category.preview ? (
                      <div className="space-y-1">
                        <img
                          src={category.preview}
                          alt="preview"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <button
                          onClick={() =>
                            setConfirmCategoryIndex({
                              productIndex: i,
                              categoryIndex: j,
                            })
                          }
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <FiTrash /> Hapus Gambar
                        </button>
                      </div>
                    ) : (
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          handleImage(i, j, e.target.files[0])
                        }
                      />
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {product.categories.map((_category, j) => (
                  <div key={j} className="space-y-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-green-200 hover:bg-green-600 text-green-500 hover:text-amber-50 flex items-center gap-2 rounded-full"
                      onClick={() => addCategory(i)}
                      disabled={product.categories.length >= maxCategories}
                    >
                      <FiPlus />
                    </Button>
                    {product.categories.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-red-100 hover:bg-red-400 text-red-500 hover:text-amber-50 rounded-full"
                        onClick={() => removeCategory(i, j)}
                      >
                        <FiTrash />
                      </Button>
                    )}
                  </div>
                ))}
                {product.categories.length >= maxCategories && (
                  <Alert className="bg-red-100 flex justify-center items-center py-2">
                    <AlertDescription className="text-center text-red-600 text-sm">
                      Anda Sudah Mencapai Maksimum Input Kategori
                    </AlertDescription>
                  </Alert>
                )}
              </TableCell>

              <TableCell>
                <div className="space-y-2 flex gap-2">
                  <Button
                    onClick={addProduct}
                    className="bg-green-200 hover:bg-green-600 text-green-500 hover:text-amber-50 flex items-center gap-2 rounded-full"
                    disabled={products.length >= maxProducts}
                  >
                    <FiPlus />
                  </Button>
                  {products.length > 1 && (
                    <Button
                      className="bg-red-100 hover:bg-red-400 text-red-500 hover:text-amber-50 rounded-full"
                      onClick={() => setConfirmProductIndex(i)}
                    >
                      <FiTrash />
                    </Button>
                  )}
                  {products.length >= maxProducts &&
                    i === products.length - 1 && (
                      <Alert className="bg-red-100 flex justify-center items-center py-2">
                        <AlertDescription className="text-center text-red-600 text-sm">
                          Anda Sudah Mencapai Maksimum Input Produk
                        </AlertDescription>
                      </Alert>
                    )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialogHapusProduct
        confirmProductIndex={confirmProductIndex}
        setConfirmProductIndex={setConfirmProductIndex}
        removeProduct={removeProduct}
      />
      <AlertDialogHapusGambar
        confirmCategoryIndex={confirmCategoryIndex}
        setConfirmCategoryIndex={setConfirmCategoryIndex}
        handleRemoveImage={handleRemoveImage}
      />
    </div>
  );
}
