'use client'



export interface DataTableFilterOption {
    label: string;
    value: string;
}

export type RangeOperator = 'gte' | 'lte';

interface BaseFilterConfig {
    id: string;
    label: string;
}

export interface SingleSelectFilterConfig extends BaseFilterConfig {
    type: 'single-select';
    options: DataTableFilterOption[];
}

export interface MultiSelectFilterConfig extends BaseFilterConfig {
    type: 'multi-select';
    options: DataTableFilterOption[];
}

export interface RangeFilterConfig extends BaseFilterConfig {
    type : 'range'
}

export type DataTableFilterConfig = 
   | SingleSelectFilterConfig
   | MultiSelectFilterConfig
   | RangeFilterConfig;

export type DataTableRangeValue = Partial<Record<RangeOperator, string>>;

export type DataTableFilterValue = string | string[] | DataTableRangeValue;

const DataTableFilters = () => {
  return (
    <div>DataTableFilters</div>
  )
}

export default DataTableFilters