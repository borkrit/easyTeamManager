<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Carbon\Carbon;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class TaskData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $description,
        public string $status,
        public int $user_id,
        public ?UserData $user,
        public ?int $project_id,
        /** @var array<CommentData>|Optional */
        public array|Optional $comments,
        public ?Carbon $created_at,
    ) {}
}