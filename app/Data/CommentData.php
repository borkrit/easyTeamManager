<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Carbon\Carbon;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CommentData extends Data
{
    public function __construct(
        public int $id,
        public string $body,
        public int $user_id,
        public ?UserData $user,
        public ?Carbon $created_at,
    ) {}
}