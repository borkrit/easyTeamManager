<?php

return [

    /*
     * Классы-коллекторы, которые ищут типы для трансформации.
     */
    'collectors' => [
        Spatie\TypeScriptTransformer\Collectors\DefaultCollector::class,
    ],

    /*
     * Преобразователи, которые превращают классы PHP в интерфейсы TypeScript.
     */
    'transformers' => [
        Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer::class,
        Spatie\TypeScriptTransformer\Transformers\SpatieEnumTransformer::class,
    ],

    /*
     * Путь, куда будет сгенерирован итоговый TypeScript файл для фронтенда.
     */
    'output_file' => resource_path('js/generated/generated.d.ts'),

    /*
     * Пути к папкам, где пакет должен искать Data-классы.
     */
    'search_paths' => [
        app_path('Data'),
    ],

    /*
     * Генераторы путей (можно оставить пустым для сохранения в один файл).
     */
    'path_generators' => [
        // Spatie\TypeScriptTransformer\PathGenerators\DefaultPathGenerator::class,
    ],

    /*
     * Префикс для сгенерированных типов (например, I для интерфейсов).
     */
    'auto_encode_complex_types' => false,
];