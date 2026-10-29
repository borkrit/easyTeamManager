<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Data\ProjectData;

class ProjectController extends Controller
{
    
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

    
   public function show(Project $project): Response
{
    $project->load(['users', 'tasks', 'comments.user']);

    return Inertia::render('Projects/Show', [
        'project' => ProjectData::from($project), // или просто $project, если без DTO
        'allUsers' => User::select('id', 'name')->get(),
    ]);
}

    
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'user_ids' => 'nullable|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $project->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        if (isset($validated['user_ids'])) {
            $project->users()->sync($validated['user_ids']);
        } else {
            $project->users()->detach();
        }

        return redirect()->back()->with('success', 'Projekt został pomyślnie zaktualizowany!');
    }

    public function destroy(Project $project)
    {

        return redirect()->route('projects.index')->with('success', 'Projekt został pomyślnie usunięty.');
    }
}