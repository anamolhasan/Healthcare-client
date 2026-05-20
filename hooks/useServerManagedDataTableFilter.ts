'use client'

import {  DataTableFilterValues, DataTableRangeValue, RangeOperator } from "@/components/shared/table/DataTableFilters"
import { ReadonlyURLSearchParams } from "next/navigation";
import { UpdateParamsFn } from "./useServerManagedDataTable";
import { useCallback, useMemo } from "react";


const DEFAULT_RANGE_OPERATORS: RangeOperator = ['gte', 'lte']

interface BaseServerManagedFilterDefinition {
    filterId: string;
}

interface SingleFilterDefinition extends BaseServerManagedFilterDefinition {
    type:'single';
    queryKey: string;
}

interface MultiFilterDefinition extends BaseServerManagedFilterDefinition {
    type:'multi';
    queryKey: string;
}

interface RangeFilterDefinition extends BaseServerManagedFilterDefinition {
    type: 'range';
    queryKey: string;
    operators?: RangeOperator[];
}

export type ServerManagedFilterDefinition = 
 | SingleFilterDefinition
 | MultiFilterDefinition
 | RangeFilterDefinition;

export const serverManagedFilter = {
    single: (filterId: string, queryKey:string = filterId) : SingleFilterDefinition => ({
        filterId,
        type: 'single',
        queryKey,
    }),
    multi: (filterId:string, queryKey:string = filterId): MultiFilterDefinition => ({
        filterId,
        type: 'multi',
        queryKey,
    }),
    range: (
        filterId: string,
        queryKey: string = filterId,
        operators?: RangeOperator[],
    ) : RangeFilterDefinition => ({
        filterId,
        type:'range',
        queryKey,
        operators,
    })
}

interface UseServerManagedDataTableFiltersParams {
    searchParams: ReadonlyURLSearchParams;
    definitions : ServerManagedFilterDefinition[];
    updateParams: UpdateParamsFn;
}

const getRangeParamKey = (queryKey:string, operator:RangeOperator) => {
    return `${queryKey}[${operator}]`;
}

export const useServerManagedDataTableFilters = ({
    searchParams,
    definitions,
    updateParams,
}:UseServerManagedDataTableFiltersParams) => {
    const filterValues = useMemo<DataTableFilterValues>(()=>{
        return definitions.reduce<DataTableFilterValues>((acc, definition)=>{
            if(definition.type === 'single'){
                acc[definition.filterId] = searchParams.get(definition.queryKey) ?? '';
                return acc
            }

            if(definition.type === 'multi'){
                acc[definition.filterId] = searchParams.getAll(definition.queryKey)
            }

            const operators = definition.operators ?? DEFAULT_RANGE_OPERATORS;
            const rangeValue: DataTableRangeValue = {};

            operators.forEach((operator) => {
                rangeValue[operator] = searchParams.get(getRangeParamKey(definition.queryKey, operator)) ?? '',
            });

            acc[definition.filterId] = rangeValue;
            return acc
        },{})
    },[definitions, searchParams])

    const handleFilterChange = useCallback((filterId:string, value:DataTableFilterValue | undefined) => {
        const definition = definitions.find((item) => item.filterId === filterId);

        if(!definition){
            return;
        }

        updateParams((params) => {
            if(definition.type === 'single'){
                const nextValue = typeof value === 'string' ? value.trim() : '';

                if(nextValue){
                    params.set(definition.queryKey, nextValue);
                    return;
                }

                params.delete(definition.queryKey)
                return;
            }

            if(definition.type === 'multi'){
                params.delete(definition.queryKey);

                const nextValues = Array.isArray(value) ? value : [];

                nextValues.forEach((item) => {
                    if(typeof item === 'string' && item.length > 0){
                        params.append(definition.queryKey, item);
                    }
                });
                return;
            }

            const operators = 
        })
    })
}