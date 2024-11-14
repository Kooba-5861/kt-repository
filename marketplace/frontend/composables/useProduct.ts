import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { useLoading } from '~/composables/layouts/useLoading';
import { useRestApi } from '~/composables/common/useRestApi';

interface UserProductOrderResponse {
  result: boolean,
  order: UserProductOrder,
}

export interface UserProductOrder {
  orderStatus: string,
  productName: string,
  productType: 'NFT' | 'OTHER',
  productImage?: string,
  meta: { name: string, value: string}[],
}

export const useProduct = () => {
  const client = generateClient<Schema>();
  const { getApi } = useRestApi();
  const { showLoading, hideLoading } = useLoading();
  const products = useState<Schema['JDPProduct']['type'][]>('Products', () => []);

  const getProducts = async () => {
    showLoading();
    const { data: dataProducts, errors } = await client.models.JDPProduct.list(
      {
        authMode: 'apiKey',
      });
    hideLoading();
    if (errors) {
      console.error(JSON.stringify(errors));
      throw new Error('getProducts Product の取得に失敗しました。');
    }
    if (dataProducts) {
      products.value = dataProducts;
    } else {
      throw new Error('Product が見つかりませんでした。');
    }
  }

  const getProductsWithCategory = async (categories: string[]) => {
    showLoading();
    // 選択されたカテゴリーの商品を取得. 1度に取得できないため、各カテゴリーごとに取得し、結合後に重複を削除.
    const promises = categories.map(async (category: string) => {
      const { data: dataProducts, errors } = await client.models.JDPProduct.listJDPProductByProductCategoryAndProductId(
        {
          productCategory: category,
        }, {
          authMode: 'apiKey',
        });
      if (errors) {
        console.error(JSON.stringify(errors));
        throw new Error('getProductsWithCategory Product の取得に失敗しました。');
      }

      if (dataProducts) {
        return dataProducts;
      } else {
        throw new Error('getProductsWithCategory Product が見つかりませんでした。');
      }
    });
    const productResults = await Promise.all(promises);
    hideLoading();
    products.value = productResults.flat().filter((product, index, self) => self.findIndex(p => p.productId === product.productId) === index);
  }

  const getProduct = async (productId: string): Promise<Schema['JDPProduct']['type']> => {
    showLoading()
    const { data: dataProduct, errors } = await client.models.JDPProduct.get({
      productId,
    }, {
      authMode: 'apiKey',
    })
    hideLoading();
    if (errors) {
      console.error(JSON.stringify(errors));
      throw new Error('getProduct Product の取得に失敗しました。');
    }
    if (dataProduct) {
      return dataProduct;
    } else {
      throw new Error('getProduct Product が見つかりませんでした。');
    }
  }

  const getProductQuantity = async (productId: string): Promise<number> => {
    showLoading();
    try {
      const res = await getApi<{ result: boolean, quantity: number }>('api/product/quantity', { productId });
      if (!res.result) {
        console.error('getProductQuantity Product の取得に失敗しました。');
        return 0;
      }
      return res.quantity;
    } catch (e) {
      console.error(e);
      throw new Error('getProductQuantity Product の取得に失敗しました。');
    } finally {
      hideLoading();
    }
  }

  const getProductOrder = async (orderId: string) => {
    showLoading();
    try {
      const res = await getApi<UserProductOrderResponse>('api/product/order', { orderId });
      if (!res.result) {
        console.error('getProductOrder Order の取得に失敗しました。');
        return null;
      }
      return res.order;
    } catch (e) {
      console.error(e);
      throw new Error('getProductOrder Order の取得に失敗しました。');
    } finally {
      hideLoading();
    }
  };

  const productCategories = useState<string[]>('ProductCategories', () => []);
  const getProductCategories = async () => {
    const { data: dataCategories, errors } = await client.models.JDPProductCategory.list({
      authMode: 'apiKey',
    });
    if (errors) {
      console.error(JSON.stringify(errors));
      console.error('getProductCategories ProductCategory の取得に失敗しました。');
      return;
    }
    if (dataCategories) {
      productCategories.value = dataCategories.map((item: Schema['JDPProductCategory']['type']) => item.categoryName);
    }
  }

  return {
    getProducts,
    getProductsWithCategory,
    getProduct,
    getProductQuantity,
    getProductOrder,
    getProductCategories,
    products,
    productCategories,
  }
}
