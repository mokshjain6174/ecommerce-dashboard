import { getAllProducts } from "@/lib/actions/product.actions";
import Dashboard from "@/components/Dashboard";
/**
 * Home Page (Root Server Component)
 * * This is an 'async' component, which allows us to fetch data directly
 * on the server. This improves SEO and initial page load speed because
 * the data is ready before the HTML is sent to the browser.
 */
export default async function Home() {
  /**
   * Data Fetching:
   * We call the Server Action 'getAllProducts' to retrieve the full 
   * list of inventory items from MongoDB.
   */
  const products = await getAllProducts();

  /**
   * UI Rendering:
   * We pass the fetched product list into the Client-side Dashboard 
   * component. This allows the Dashboard to handle interactive features
   * like searching, filtering, and opening the Edit forms.
   */
  return <Dashboard products={products} />;
}