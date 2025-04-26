import { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Alert, AlertDescription } from "./ui/alert";

type Product = {
  name: string;
  description: string;
  categories: { name: string; image: File | null; preview: string | null }[];
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([
    {
      name: "",
      description: "",
      categories: [{ name: "", image: null, preview: null }],
    },
  ]);
  const [confirmProductIndex, setConfirmProductIndex] = useState<number | null>(
    null
  );
  const [confirmCategoryIndex, setConfirmCategoryIndex] = useState<{
    productIndex: number;
    categoryIndex: number;
  } | null>(null);

  const maxCategories = 3;
  const maxProducts = 5;

  const addProduct = () => {
    if (products.length < maxProducts) {
      setProducts([
        ...products,
        {
          name: "",
          description: "",
          categories: [{ name: "", image: null, preview: null }],
        },
      ]);
    }
  };

  const removeProduct = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
    setConfirmProductIndex(null);
  };

  const addCategory = (productIndex: number) => {
    const updated = [...products];
    if (updated[productIndex].categories.length < maxCategories) {
      updated[productIndex].categories.push({
        name: "",
        image: null,
        preview: null,
      });
      setProducts(updated);
    }
  };

  const removeCategory = (productIndex: number, categoryIndex: number) => {
    const updated = [...products];
    updated[productIndex].categories.splice(categoryIndex, 1);
    setProducts(updated);
  };

  const handleChange = (
    index: number,
    field: "name" | "description",
    value: string
  ) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleImage = (
    productIndex: number,
    categoryIndex: number,
    file: File
  ) => {
    const updated = [...products];
    updated[productIndex].categories[categoryIndex].image = file;
    updated[productIndex].categories[categoryIndex].preview =
      URL.createObjectURL(file);
    setProducts(updated);
  };

  const handleRemoveImage = () => {
    if (confirmCategoryIndex === null) return;
    const updated = [...products];
    const { productIndex, categoryIndex } = confirmCategoryIndex;
    updated[productIndex].categories[categoryIndex].image = null;
    updated[productIndex].categories[categoryIndex].preview = null;
    setProducts(updated);
    setConfirmCategoryIndex(null);
  };

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
                <input
                  className="border px-2 py-1 w-full rounded"
                  value={product.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                  placeholder="Nama produk"
                />
              </TableCell>
              <TableCell>
                {product.categories.map((category, j) => (
                  <div key={j} className="flex items-center gap-2 mb-2">
                    <input
                      className="border px-2 py-1 w-full rounded"
                      value={category.name}
                      onChange={(e) => {
                        const updated = [...products];
                        updated[i].categories[j].name = e.target.value;
                        setProducts(updated);
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
                {product.categories.map((category, j) => (
                  <div key={j} className="space-y-2 flex gap-2  ">
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

      {/* Dialog Hapus Produk */}
      {confirmProductIndex !== null && (
        <AlertDialog
          open={confirmProductIndex !== null}
          onOpenChange={() => setConfirmProductIndex(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apakah Anda Yakin untuk Menghapus Produk Ini?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="text-white"
                style={{ backgroundColor: "#808080" }}
              >
                Batalkan
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => removeProduct(confirmProductIndex)}
                className="text-white"
                style={{ backgroundColor: "#D22B2B" }}
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Dialog Hapus Gambar Kategori */}
      {confirmCategoryIndex !== null && (
        <AlertDialog
          open={confirmCategoryIndex !== null}
          onOpenChange={() => setConfirmCategoryIndex(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apakah Anda Yakin untuk Menghapus Gambar Kategori Ini?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="text-white"
                style={{ backgroundColor: "#808080" }}
              >
                Batalkan
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRemoveImage}
                className="text-white"
                style={{ backgroundColor: "#D22B2B" }}
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
