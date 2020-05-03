/// <reference path="IModelsParams.ts" />

namespace calcApi {
    export interface IApiCalc {
        init: (modelsParams: IModelsParams) => void
    }
}
