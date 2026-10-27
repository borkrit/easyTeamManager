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
        /** @var 'niski'|'sredni'|'wysoki' */
        public ?string $priority,
        public int $user_id,
        public ?UserData $user,
        public ?int $project_id,
        public ?string $projectName,   
        public ?string $assigneeName,
        /** @var array<CommentData>|Optional */
        public array|Optional $comments,
        public ?Carbon $created_at,
    ) {}

    public static function from(mixed ...$payloads): static
    {
        $task = $payloads[0];

        $commentsData = Optional::create();
        if ($task->relationLoaded('comments') && $task->comments) {
            $commentsData = CommentData::collect($task->comments);
            if ($commentsData instanceof \Illuminate\Support\Collection) {
                $commentsData = $commentsData->all();
            }
        }

        return new static(
            id: $task->id,
            title: $task->title,
            description: $task->description,
            status: $task->status,
            priority: $task->priority ?? 'sredni',
            user_id: $task->user_id,
            user: $task->relationLoaded('user') && $task->user ? UserData::from($task->user) : null,
            project_id: $task->project_id,
            projectName: $task->project?->name,   
            assigneeName: $task->user?->name,     
            comments: $commentsData,
            created_at: $task->created_at,
        );
    }
}