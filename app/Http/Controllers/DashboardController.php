<?php

namespace App\Http\Controllers;

use App\Data\TaskData;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        // Собираем статистику для карточек (StatCard)
        $stats = [
            'totalProjects' => Project::count(),
            'totalTasks' => Task::count(),
            'completedTasks' => Task::where('status', 'zakonczone')->count(),
            'totalTeamMembers' => User::count(),
        ];

        // Получаем последние 5 задач с нужными связями
        $recentTasksRaw = Task::with(['user', 'project'])
            ->latest()
            ->limit(5)
            ->get();

        // Трансформируем через TaskData, чтобы структура совпадала с ожиданиями фронтенда
        $recentTasks = $recentTasksRaw->map(fn ($task) => TaskData::from($task));

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recentTasks' => $recentTasks,
        ]);
    }
}