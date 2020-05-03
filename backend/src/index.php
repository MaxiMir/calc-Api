<?php
    
    declare(strict_types = 1);
    
    require '../vendor/autoload.php';
    
    use app\Controllers\CEntity;
    use Slim\App;
    
    $app = new App();
    
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });
    
    $app->add(function ($req, $res, $next) {
        $response = $next($req, $res);
        
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers',
                'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST');
    });
    
    $app->get('/[{urnName}/[{id}/]]', function ($request, $response, $args) {
        try {
            $status = 200;
            ['urnName' => $urnName, 'id' => $entityID] = $args;
            
            $className = CEntity::urnToModelName($urnName);
            $model = CEntity::getModelInstance($className);
            
            if (!is_numeric($entityID)) {
                $entityData = $model->findAll();
            } else {
                $preparedID = (int)$entityID;
                $entityData = $model->findByID($preparedID);
                
                if (!$entityData) {
                    throw new Exception("ID {$preparedID} not found");
                }
            }
            
            $responseData = ['isSuccess' => true, 'data' => $entityData];
        } catch (Exception $e) {
            $status = 404;
            $responseData = ['isSuccess' => false, 'msg' => $e->getMessage()];
        } finally {
            return $response->withJson($responseData, $status, JSON_UNESCAPED_UNICODE);
        }
    });
    
    $app->post('/', function ($request, $response, $args) {
        try {
            $status = 200;
            $parsedBody = $request->getParsedBody();
            
            [
                'modelsParams' => $modelsParams,
                'data' => $data,
                'bindingMap' => $bingingData,
                'excludedModels' => $excludedModels,
            ] = $parsedBody;
            
            $entitiesData = $data ?? [];
            $bindingMap = $bingingData ?? [];
            
            $modelData = CEntity::convertToModelsData($modelsParams);
            
            foreach ($modelData as $modelName => $entityDataToSearch) {
                if (!empty($excludedModels) && in_array($modelName, $excludedModels)) {
                    continue;
                }
                
                $entity = new CEntity($modelName, $bindingMap, $entityDataToSearch);
                $bindingMap = $entity->getNewBindingMap();
                $entitiesData[] = $entity->getDataForJson();
            }
            
            $responseData = ['isSuccess' => true, 'data' => $entitiesData];
        } catch (Exception $e) {
            $responseData = ['isSuccess' => false, 'msg' => $e->getMessage()];
            $status = 404;
        }
        
        return $response->withJson($responseData, $status, JSON_UNESCAPED_UNICODE);
    });
    
    $app->run();