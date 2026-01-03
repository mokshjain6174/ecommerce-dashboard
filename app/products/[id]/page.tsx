import { getProductById } from "@/lib/actions/product.actions";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";
type Props = {
  params: Promise<{ id: string }>
}
export default async function EditProductPage({ params }:Props) {
  // 1. Get the ID from the URL
  const { id } = await params;

  // 2. Fetch the product data
  const product = await getProductById(id);

  // 3. Safety Check: If no product found
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h1>
        <p className="text-slate-500 mb-6">This item may have been deleted.</p>
        <Link 
          href="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // 4. Render the beautiful Edit Page
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
            <p className="text-slate-500 mt-1">Update details for {product.name}</p>
          </div>
          
          {/* Back Button */}
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* The Form (Reusing your existing component) */}
        <div className="shadow-xl shadow-slate-200 rounded-2xl overflow-hidden">
           <ProductForm initialData={product} />
        </div>

      </div>
    </div>
  );
}