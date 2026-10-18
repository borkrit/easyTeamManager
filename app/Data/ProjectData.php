<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Carbon\Carbon;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ProjectData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $description,
        /** @var array<UserData>|Optional */
        public array|Optional $users,
        /** @var array<TaskData>|Optional */
        public array|Optional $tasks,
        /** @var array<CommentData>|Optional */
        public array|Optional $comments,
        public ?Carbon $created_at,
    ) {}
}