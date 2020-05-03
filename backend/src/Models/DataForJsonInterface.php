<?php
    
    namespace app\Models;
    
    interface DataForJsonInterface
    {
        /**
         * Возвращает данные для JSON
         *
         * @param array|null $secondData
         * @return array
         */
        public function getDataForJson(?array $secondData): array;
    }
    