import { stringify } from 'qs';
import { getServiceEnvConfig } from '~/.env-config';
import { createRequest } from './request';

const { proxyPattern } = getServiceEnvConfig(import.meta.env);

export const request = createRequest({
  baseURL: proxyPattern,
  paramsSerializer: params => stringify(params, { arrayFormat: 'repeat' })
});

export const mockRequest = createRequest({ baseURL: '/mock' });
