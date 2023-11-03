import { ArrayMaxSize, ArrayMinSize, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Pageable } from '@/share/page';
import { Default, ParseArray, ParseBooleanString } from '@/share/transforms';

export class ProductParams extends Pageable {
  @ParseBooleanString()
  @IsBoolean()
  @Expose({ name: 'bool' })
  bool!: string;

  @Type(() => String)
  @IsString()
  @Default('123')
  @Expose({ name: 'str' })
  str!: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'num' })
  num?: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose({ name: 'strSel' })
  strSel?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'numSel' })
  numSel?: number;

  @ParseArray()
  @Type(() => String)
  @Expose({ name: 'strMulSel' })
  strMulSel!: string[];

  @ParseArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Expose({ name: 'numMulSel' })
  numMulSel!: number[];

  @ParseArray()
  @Type(() => Date)
  @IsDate({ each: true })
  @ArrayMinSize(0)
  @ArrayMaxSize(2)
  @Expose({ name: 'dateRange' })
  dateRange!: Date[];

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @Expose({ name: 'date' })
  date?: Date;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose({ name: 'autoComplete' })
  autoComplete?: string;
}

export class CreateProductDto {
  public title = '';

  public startingPrice = 0;

  public step = 1;

  public duration = 1;

  public startTime: string | null = null;
}
