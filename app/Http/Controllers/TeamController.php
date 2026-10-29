<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    
    public function index(): Response
    {
        $members = User::withCount(['tasks', 'projects'])
            ->latest()
            ->get(['id', 'name', 'email', 'role', 'created_at']);

        return Inertia::render('Team/Index', [
            'members' => $members,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'string', Rule::in(['admin', 'manager', 'developer', 'viewer'])],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->back()->with('success', 'Użytkownik został pomyślnie dodany.');
    }

   
    public function show(User $user): Response
    {
       
        $user->load([
            'tasks' => fn ($query) => $query->with('project:id,name')->latest(),
            'projects' => fn ($query) => $query->withCount('tasks')->latest(),
        ]);

        return Inertia::render('Team/Show', [
            'member' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'created_at' => $user->created_at->format('Y-m-d'),
                'tasks' => $user->tasks,
                'projects' => $user->projects,
            ],
        ]);
    }

    public function destroy(User $user)
{
    // $user->tasks()->update(['user_id' => null]); // Если нужно освободить задачи
    $user->delete();

    return redirect()->route('team.index')->with('success', 'Użytkownik został usunięty z zespołu.');
}
}