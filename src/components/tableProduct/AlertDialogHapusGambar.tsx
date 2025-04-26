import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type AlertDialogHapusGambarProps = {
  confirmCategoryIndex: { productIndex: number; categoryIndex: number } | null;
  setConfirmCategoryIndex: (
    index: { productIndex: number; categoryIndex: number } | null
  ) => void;
  handleRemoveImage: () => void;
};

export default function AlertDialogHapusGambar({
  confirmCategoryIndex,
  setConfirmCategoryIndex,
  handleRemoveImage,
}: AlertDialogHapusGambarProps) {
  return (
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
  );
}
