<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = [
            ['id' => 1, 'title' => 'Configure FSD architecture and TypeScript', 'status' => 'completed'],
            ['id' => 2, 'title' => 'Integrate CVA and table components', 'status' => 'in_progress'],
            ['id' => 3, 'title' => 'Verify Inertia.js integration', 'status' => 'pending'],
        ];

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }
}