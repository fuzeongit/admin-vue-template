declare namespace QuickQuery {
  type ParamValue = number | string | Date | Array<string | number | Date>;

  type Params = Record<string, ParamValue>;

  type FormParams = Record<string, number | string | null | Array<string | number>>;

  interface Option {
    label?: string;
    placeholder?: string;
    additional?: boolean;
    hasDefault?: boolean;
    width?: string | number;
  }

  interface StringOption extends Option {
    type: import('@/constants').QueryParamsType.String;
  }

  interface NumberOption extends Option {
    type: import('@/constants').QueryParamsType.Number;
    min?: number;
    max?: number;
  }

  interface SelectOption extends Option {
    type: import('@/constants').QueryParamsType.Select;
    options: Array<import('naive-ui').SelectOption>;
    valueType?: 'string' | 'number';
    loading?: boolean;
    remote?: boolean;
    action?: (value: string) => void;
  }

  interface MultiSelectOption extends Option {
    type: import('@/constants').QueryParamsType.MultiSelect;
    options: Array<import('naive-ui').SelectOption>;
    valueType?: 'string' | 'number';
    loading?: boolean;
    remote?: boolean;
    action?: (value: string) => void;
  }

  interface DateRangeOption extends Option {
    type: import('@/constants').QueryParamsType.DateRange;
    startPlaceholder?: string;
    endPlaceholder?: string;
  }

  interface DateOption extends Option {
    type: import('@/constants').QueryParamsType.Date;
  }

  interface AutoCompleteOption extends Option {
    type: import('@/constants').QueryParamsType.AutoComplete;
    options: Array<import('naive-ui').AutoCompleteOption>;
    loading: boolean;
    action: (value: string) => void;
  }

  interface CascaderOption extends Option {
    type: import('@/constants').QueryParamsType.Cascader;
    options: Array<import('naive-ui').CascaderOption>;
    remote?: boolean;
    onLoad?: (value: import('naive-ui').CascaderOption) => Promise<void>;
  }

  type ModelOption =
    | StringOption
    | NumberOption
    | SelectOption
    | MultiSelectOption
    | DateRangeOption
    | DateOption
    | AutoCompleteOption
    | CascaderOption;

  type Model<T> = {
    [key in keyof T]?: ModelOption;
  };
}

/** 用户相关模块 */
declare namespace Vo {
  interface Base {
    id: number;
    createdDate: string;
    lastModifiedDate: string;
  }

  interface Business extends Base {
    createdBy?: number;
    lastModifiedBy?: number;
  }
}

declare namespace AuthModule {
  type Permissions = 'test';

  interface RoleVo extends Vo.Base {}

  interface CustomerVo extends Vo.Base {
    name: string;
    permissions: Permissions[];
    level: string;
  }

  interface TokenVo {
    tokenName: string;
    tokenValue: string;
    isLogin: boolean;
    loginId: number;
    loginType: string;
    tokenTimeout: number;
    sessionTimeout: number;
    tokenSessionTimeout: number;
    tokenActivityTimeout: number;
    loginDevice: string;
    tag: string;
  }

  interface CaptchaVo {
    text: string;
    data: string;
    publicKey: string;
  }
}

declare namespace ProductModule {
  interface ProductVo extends Vo.Business {
    title: string;
    step: number;
  }
}
