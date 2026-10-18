<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Список проектов с участниками и подсчетом задач
     */
    public function index(): Response
    {
        $projects = Project::with(['users:id,name,email', 'tasks'])
            ->withCount('tasks')
            ->latest()
            ->get();

        $users = User::select('id', 'name', 'email')->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'users' => $users,
        ]);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'user_ids' => 'nullable|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $project = Project::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        
        if (!empty($validated['user_ids'])) {
            $project->users()->attach($validated['user_ids']);
        }

        return redirect()->back()->with('success', 'Projekt został pomyślnie utworzony!');
    }

    /**
     * Детальная страница проекта (с его задачами и командой)
     */
    public function show(Project $project): Response
    {
        $project->load(['users:id,name,email', 'tasks.user:id,name']);

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }
}