"use client";

import { deleteProduct } from "@/lib/actions/product.actions";

/**
 * DeleteButton Component
 * A client-side interactive component used to remove products from the database.
 */
 
export default function DeleteButton({ id }: { id: string }) {
  /**
   * handleAction
   * Triggers a browser confirmation dialog before executing the server action.
   * This prevents accidental data loss.
   */
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await deleteProduct(id);
    }
  };

  return (
    <button onClick={handleDelete} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
      {/* Trash Can Icon */}
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    </button>
  );
}