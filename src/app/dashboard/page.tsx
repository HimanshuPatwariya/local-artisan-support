'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), where('artisanId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, router]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...newProduct,
        price: parseFloat(newProduct.price),
        artisanId: user.uid,
        createdAt: new Date(),
      });

      setProducts([...products, { id: docRef.id, ...newProduct, price: parseFloat(newProduct.price) }]);
      setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts(products.filter(product => product.id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Artisan Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              step="0.01"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={newProduct.imageUrl}
              onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">${product.price}</p>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 