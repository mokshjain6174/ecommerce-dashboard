import ProductForm from "@/components/ProductForm";
import { getProductById } from "@/lib/actions/product.actions";

export default async function EditPage({ params }: { params: { id: string } }) {
  // 1. Fetch the ID from the URL (awaiting params is required in Next.js 15)
  const { id } = await params;
  
  // 2. Get the product data from the database
  const product = await getProductById(id);

  if (!product) {
    return <div className="p-10 text-center text-red-500">Product not found!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Edit Product</h1>
      
      {/* 3. Load the Form with the existing data */}
      {/* (It might show a red line on 'initialData' for now - we will fix that next!) */}
      <ProductForm type="Edit" initialData={product} />
    </div>
  );
}