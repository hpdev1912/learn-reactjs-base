import productApi from 'api/productApi';
import { useEffect, useState } from 'react';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await productApi.get(productId);

        setProduct(data);
      } catch (error) {
        console.log('Fail to fetch product detail', error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
