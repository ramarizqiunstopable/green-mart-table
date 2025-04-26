export type Product = {
  name: string;
  description: string;
  categories: {
    name: string;
    image: File | null;
    preview: string | null;
  }[];
};
