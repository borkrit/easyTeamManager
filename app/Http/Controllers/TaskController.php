<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    
    public function index(): Response
    {
        $tasks = Task::with('user')->latest()->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

   
    public function store(Request $request)
    {
      
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:do_zrobienia,w_trakcie,zakonczone',
            'user_id' => 'required|exists:users,id',
        ]);

        Task::create($validated);

        return redirect()->back()->with('success', 'Zadanie zostało utworzone!');
    }
}