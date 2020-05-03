/// <reference path="IModelsParams.ts" />
/// <reference path="IElementData.ts" />

namespace calcApi {
    export interface IContainerData {
        id?: number,
        title?: string,
        sort: number,
        header: string,
        table: keyof IModelsParams,
        checkedID: number | null,
        type: 'section' | 'price',
        elements: IElementData[],
        elemBinding?: object
    }
}