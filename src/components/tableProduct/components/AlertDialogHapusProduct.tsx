import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

type AlertDialogHapusProductProps = {
  confirmProductIndex: number | null;
  setConfirmProductIndex: (index: number | null) => void;
  removeProduct: (index: number) => void;
};

export default function AlertDialogHapusProduct({
  confirmProductIndex,
  setConfirmProductIndex,
  removeProduct,
}: AlertDialogHapusProductProps) {
  return (
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
            onClick={() => removeProduct(confirmProductIndex!)}
            className="text-white"
            style={{ backgroundColor: "#D22B2B" }}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
