<?php

namespace App\Http\Controllers;

use App\Data\TaskData;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\TaskStatus;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        
        $stats = [
            'totalProjects' => Project::count(),
            'totalTasks' => Task::count(),
            'completedTasks' => Task::where('status', TaskStatus::ZAKONCZONE)->count(),
            'totalTeamMembers' => User::count(),
        ];

        $recentTasksRaw = Task::with(['user', 'project'])
            ->latest()
            ->limit(5)
            ->get();

        $recentTasks = $recentTasksRaw->map(fn ($task) => TaskData::from($task));

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recentTasks' => $recentTasks,
        ]);
    }
}