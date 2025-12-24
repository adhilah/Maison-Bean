
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0)
    return <p className="text-center mt-10">Wishlist is empty</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded shadow">
          <img src={item.image} className="h-40 w-full object-cover rounded" />
          <h3 className="mt-2 font-semibold">{item.name}</h3>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => addToCart(item)}
              className="flex-1 bg-orange-800 text-white py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(item)}
              className="flex-1 border py-2 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
