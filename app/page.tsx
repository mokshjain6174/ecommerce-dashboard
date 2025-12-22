import { getAllProducts } from "@/lib/actions/product.actions";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const products = await getAllProducts();
  return <Dashboard products={products} />;
}