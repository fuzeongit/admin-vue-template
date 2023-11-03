import { Expose, Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { Default, ParseArray } from '../transforms';

export class Pageable {
  @Type(() => Number)
  @Default(1)
  @IsInt()
  @Expose({ name: 'pageNumber' })
  pageNumber: number;

  @Type(() => Number)
  @Default(5)
  @IsInt()
  @Expose({ name: 'pageSize' })
  pageSize: number;

  @Type(() => String)
  @IsString({ each: true })
  @ParseArray('createdDate,desc')
  @Expose({ name: 'sort' })
  sort: string[];

  constructor(query?: Partial<Pageable>) {
    this.pageNumber = query?.pageNumber ?? 1;
    this.pageSize = query?.pageSize ?? 5;
    this.sort = query?.sort ?? ['createdDate,desc'];
  }
}
