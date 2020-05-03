/// <reference path="IContainerData.ts" />

namespace calcApi {
    export interface IRenderData {
        error?: string | null,
        containersData?: IContainerData[],
    }
}