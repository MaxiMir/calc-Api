<?php
    
    namespace app\Controllers;
    
    use app\Models\{MEntity, PriceCost};
    use Exception;
    
    class CEntity implements CEntityInterface, DataForJsonInterface
    {
        public const ModelsNamespace = 'app\Models\\';
        
        /**
         * Инстанс модели
         *
         * @var MEntity
         */
        private $model;
        
        /**
         * Данные по привязкам всех моделей
         *
         * @var array
         */
        private $bindingMap;
        
        /**
         * Данные по привязкам к текущей модели
         *
         * @var array
         */
        private $bindings;
        
        /**
         * Данные по привязкам текущей модели к другим моделям
         *
         * @var array
         */
        private $bindingsToOhers;
        
        /**
         * Фильтровые данные для элементов модели
         *
         * @var array
         */
        private $modelDataToSearch;
        
        /**
         * Найденные элементы
         *
         * @var array
         */
        private $elements;
        
        /**
         * CEntity constructor.
         *
         * @param string $modelName
         * @param array $bindingMap
         * @param array|null $modelDataToSearch
         * @throws Exception
         */
        function __construct(string $modelName, array $bindingMap, ?array $modelDataToSearch)
        {
            $this->model = self::getModelInstance($modelName);
            $bindKey = $this->model::KEY;
            $this->bindingMap = $bindingMap;
            $this->bindings = $bindingMap[$bindKey] ?? [];
            $this->modelDataToSearch = $modelDataToSearch ?? [];
            $this->elements = $this->getElements();
            $this->bindingsToOhers = $this->getbindingsToOhers();
        }
        
        /**
         * Возвращает элементы модели
         *
         * @return array
         */
        public function getElements(): array
        {
            $bindings = $this->bindings;
            
            if ($this->model instanceof PriceCost) {
                $bindings = array_merge($this->modelDataToSearch, $bindings);
            }
            
            return !$bindings ?
                $this->model->findAll()
                :
                $this->model->find($bindings);
        }
        
        /**
         * Возвращает данные модели для JSON
         *
         * @return array
         */
        public function getDataForJson(): array
        {
            ['ID' => $id] = $this->modelDataToSearch;
            
            $secondData = ['checkedID' => $id, 'elements' => $this->elements];
            
            if ($id) {
                $secondData['elemBinding'] = $this->bindingsToOhers;
            }
            
            return $this->model->getDataForJson($secondData);
        }
        
        /**
         * Возвращает элементы для связывания для BindingMap
         *
         * @return array
         */
        public function getElementsForBindingMap(): array
        {
            if ($this->model instanceof PriceCost) {
                return $this->model->find($this->bindings);
            }
            
            if (!$this->modelDataToSearch) {
                return $this->elements;
            }
            
            $fullDataToSearch = array_merge($this->bindings, $this->modelDataToSearch);
            
            return $this->model->find($fullDataToSearch);
        }
        
        /**
         * Возвращает данные по привязкам к другим моделям
         *
         * @return array
         */
        public function getbindingsToOhers(): array
        {
            $elementsForBindingMap = $this->getElementsForBindingMap();
            
            return $this->model->findBindingData($elementsForBindingMap);
        }
        
        /**
         * Возвращает данные по привязкам с учетом текущей модели
         *
         * @return array
         */
        public function getNewBindingMap(): array
        {
            return array_merge($this->bindingMap, $this->bindingsToOhers);
        }
        
        /**
         * Преобразует часть urn в название модели
         * @param $urnName
         * @return string
         */
        static function urnToModelName($urnName): string
        {
            $entityNameParts = explode('-', $urnName);
            
            return array_reduce($entityNameParts, function ($acc, $namePart) {
                $acc .= ucfirst($namePart);
                
                return $acc;
            }, '');
        }
        
        /**
         * Возвращает инстанс модели
         *
         * @param string $className
         * @return MEntity
         * @throws Exception
         */
        static function getModelInstance(string $className): MEntity
        {
            $modelClass = self::ModelsNamespace . $className;
            
            if (!class_exists($modelClass)) {
                throw new Exception("Class {$className} not found");
            }
            
            return new $modelClass;
        }
        
        /**
         * Возвращает массив с названиями моделей
         *
         * @return array
         */
        static function getInitModelsData(): array
        {
            return [
                'Services' => [],
                'CalcSettings' => [],
                'PriceName' => [],
                'PriceCost' => [],
                'PriceParam2' => [],
                'PriceParam1' => [],
                'MatTypes' => [],
                'Materials' => [],
                'MatFormats' => [],
            ];
        }
        
        /**
         * Преобразует массив в массив с названиями моделей и заполняет данными
         *
         * @param array $modelsParams
         * @return array
         * @throws Exception
         */
        static function convertToModelsData(array $modelsParams): array
        {
            $offset = 1;
            $countEntities = sizeof($modelsParams);
            $modelsData = self::getInitModelsData();
            
            foreach ($modelsParams as $className => $id) {
                if (!array_key_exists($className, $modelsData)) {
                    throw new Exception("Class {$className} not found");
                }
                
                if (!is_numeric($id)) {
                    continue;
                }
                
                $preparedID = (int) $id;
                $modelsData[$className] = ['ID' => $preparedID];
                
                if ($className === 'PriceParam1') {
                    $modelsData['PriceCost']['param1ID'] = $preparedID;
                }
                
                if ($className === 'PriceParam2') {
                    $modelsData['PriceCost']['param2ID'] = $preparedID;
                }
            }
            
            if (!empty($modelsData['Services'])) { // первый блок выбран
                $offset = $countEntities < 3 ? $countEntities + 1 : $countEntities + 2;
            }
            
            return array_slice($modelsData, 0, $offset, true);
        }
    }