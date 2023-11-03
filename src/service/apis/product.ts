import type { CreateProductDto, ProductParams } from '@/params/product';
import { mockRequest, request } from '../request';

export const productApis = {
  paging(params: ProductParams) {
    return request.get<Common.Pagination<ProductModule.ProductVo>>('/product/paging', { params });
  },
  pagingSelf(params: ProductParams) {
    return request.get<Common.Pagination<ProductModule.ProductVo>>('/product/paging-self', { params });
  },
  create(body: CreateProductDto) {
    return request.post<ProductModule.ProductVo>('/product/create', body);
  },
  test() {
    return mockRequest.post<any>('/auth/password-login');
  }
};
