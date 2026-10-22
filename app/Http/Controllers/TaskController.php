<?php

namespace App\Http\Controllers;

use App\Data\TaskData;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
   
public function index(Request $request): Response
    {
        $query = Task::with(['user', 'project', 'comments.user']);
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('project_id')) {
            $query->where('project_id', $request->integer('project_id'));
        }

        $tasks = $query->latest()->paginate(10)->withQueryString();
        
        $tasks->getCollection()->transform(fn ($task) => TaskData::from($task));

        $users = User::select('id', 'name')->get();
        $projects = \App\Models\Project::with('users:id,name')->select('id', 'name')->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'users' => $users,
            'projects' => $projects,
            'filters' => $request->only(['status', 'project_id']),
        ]);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:do_zrobienia,w_trakcie,zakonczone',
            'priority' => 'required|string|in:niski,sredni,wysoki', 
            'user_id' => 'required|exists:users,id',
            'project_id' => 'nullable|exists:projects,id',
        ]);

        Task::create($validated);

        return redirect()->back()->with('success', 'Zadanie zostało utworzone!');
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:do_zrobienia,w_trakcie,zakonczone',
            'priority' => 'required|string|in:niski,sredni,wysoki',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'nullable|exists:projects,id',
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Zadanie zostało zaktualizowane!');
    }
    
    public function bulkAction(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|in:delete,status_do_zrobienia,status_w_trakcie,status_zakonczone',
            'task_ids' => 'required|array',
            'task_ids.*' => 'exists:tasks,id',
        ]);

        $taskIds = $validated['task_ids'];

        switch ($validated['action']) {
            case 'delete':
                Task::whereIn('id', $taskIds)->delete();
                $message = 'Wybrane zadania zostały usunięte.';
                break;
            case 'status_do_zrobienia':
                Task::whereIn('id', $taskIds)->update(['status' => 'do_zrobienia']);
                $message = 'Status wybranych zadań zmieniony na "Do zrobienia".';
                break;
            case 'status_w_trakcie':
                Task::whereIn('id', $taskIds)->update(['status' => 'w_trakcie']);
                $message = 'Status wybranych zadań zmieniony na "W trakcie".';
                break;
            case 'status_zakonczone':
                Task::whereIn('id', $taskIds)->update(['status' => 'zakonczone']);
                $message = 'Status wybranych zadań zmieniony na "Zakończone".';
                break;
        }

        return redirect()->back()->with('success', $message);
    }
}