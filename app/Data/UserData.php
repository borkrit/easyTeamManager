<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Carbon\Carbon;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public ?string $role,
        public ?int $tasks_count,     
        public ?int $projects_count, 
        public ?Carbon $created_at,
    ) {}
}