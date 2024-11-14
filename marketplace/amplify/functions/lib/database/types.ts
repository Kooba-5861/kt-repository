export type JDPProductType = 'NFT' | 'OTHER';

export class JDPProduct {
  productId: string = '';
  productName: string = '';
  productDescription: string = '';
  productImage?: string = '';
  productCategory: string = '';
  productPrice: number = 0;
  productTax: number = 0;
  productStock: number = 0;
  productType: JDPProductType = 'OTHER';

  static from (item: any): JDPProduct {
    const o = new JDPProduct();
    o.productId = item['productId'];
    o.productName = item['productName'];
    o.productDescription = item['productDescription'];
    o.productImage = item['productImage'];
    o.productCategory = item['productCategory'];
    o.productPrice = item['productPrice'];
    o.productTax = item['productTax'];
    o.productType = item['productType'];
    return o;
  }
}

type JDPProductInventoryStatus = 'active' | 'reserved' | 'sold';

export class JDPProductInventory {
  productId: string = '';
  resourceId: string = '';
  appId: string = '';
  nftId: string = '';
  inventoryStatus: JDPProductInventoryStatus = 'active';
  reservedExpireAt: number = 0;

  static from (item: any): JDPProductInventory {
    const o = new JDPProductInventory();
    o.productId = item['productId'];
    o.resourceId = item['resourceId'];
    o.appId = item['appId'];
    o.nftId = item['nftId'];
    o.inventoryStatus = item['inventoryStatus'];
    o.reservedExpireAt = item['reservedExpireAt'];
    return o;
  }
}

export class JDPProductOrder {
  orderId: string = '';
  productId: string = '';
  productType: string = '';
  userId: string = '';
  amount: number = 0;
  tax: number = 0;
  orderStatus: string = '';
  linkUrl: string = '';
  linkUrlExpiredAt: number = 0;
  accessId?: string = '';
  accessPass?: string = '';
  meta?: string = '';

  static from (item: any): JDPProductOrder {
    const o = new JDPProductOrder();
    o.orderId = item['orderId'];
    o.productId = item['productId'];
    o.productType = item['productType'];
    o.userId = item['userId'];
    o.amount = item['amount'];
    o.tax = item['tax'];
    o.orderStatus = item['orderStatus'];
    o.linkUrl = item['linkUrl'];
    o.linkUrlExpiredAt = item['linkUrlExpiredAt'];
    o.accessId = item['accessId'];
    o.accessPass = item['accessPass'];
    o.meta = item['meta'];
    return o;
  }
}
