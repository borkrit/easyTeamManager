<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Добавление комментария к задаче
     */
    public function storeTaskComment(Request $request, Task $task)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $task->comments()->create([
            'body' => $validated['body'],
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Komentarz został dodany!');
    }

    /**
     * Добавление комментария к проекту
     */
    public function storeProjectComment(Request $request, Project $project)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $project->comments()->create([
            'body' => $validated['body'],
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Komentarz został dodany!');
    }
}