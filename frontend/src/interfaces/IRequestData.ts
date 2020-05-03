/// <reference path="IModelsParams.ts" />
/// <reference path="IContainerData.ts" />

namespace calcApi {
    export interface IRequestData {
        modelsParams: IModelsParams,
        data?: IContainerData[],
        bindingMap?: object,
        excludedModels?: keyof IModelsParams|{}
    }
}