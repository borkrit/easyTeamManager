<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // 📊 Aggregate statistics for the main dashboard
        $stats = [
            'totalProjects' => 12,
            'activeProjects' => 8,
            'totalTasks' => 48,
            'completedTasks' => 31,
            'teamMembersCount' => 14,
            'completionRate' => 64.5,
        ];

        // 📁 Active projects list with progress tracking
        $projects = [
            [
                'id' => 1,
                'name' => 'EasyTeamManager Task Manager',
                'description' => 'Laravel 13, Inertia.js, React & FSD architecture',
                'status' => 'In Progress',
                'progress' => 75,
                'deadline' => '2026-11-15',
            ],
            [
                'id' => 2,
                'name' => 'IIoT Factory Telemetry Dashboard',
                'description' => 'Real-time PLC data tags and milling machine schematics',
                'status' => 'Active',
                'progress' => 40,
                'deadline' => '2026-12-01',
            ],
            [
                'id' => 3,
                'name' => 'Mobile App Fastlane CI/CD',
                'description' => 'Android Kotlin & Jetpack Compose automation pipeline',
                'status' => 'Review',
                'progress' => 90,
                'deadline' => '2026-10-25',
            ],
        ];

        // 👥 Teams and their workload
        $teams = [
            [
                'id' => 1,
                'name' => 'Frontend Architecture',
                'lead' => 'Vladyslav Pohorilyi',
                'membersCount' => 5,
                'activeTasks' => 12,
            ],
            [
                'id' => 2,
                'name' => 'Backend Core & Microservices',
                'lead' => 'Alex Miller',
                'membersCount' => 4,
                'activeTasks' => 8,
            ],
            [
                'id' => 3,
                'name' => 'DevOps & Infrastructure',
                'lead' => 'Dmitry K.',
                'membersCount' => 5,
                'activeTasks' => 5,
            ],
        ];

        // 📝 Recent tasks list
        $recentTasks = [
            ['id' => 1, 'title' => 'Configure FSD architecture and TypeScript strict mode', 'project' => 'EasyTeamManager ', 'status' => 'completed', 'priority' => 'High'],
            ['id' => 2, 'title' => 'Integrate CVA and modular table components', 'project' => 'EasyTeamManager ', 'status' => 'in_progress', 'priority' => 'Medium'],
            ['id' => 3, 'title' => 'Map PLC data tags for milling machine telemetry', 'project' => 'IIoT Factory Telemetry', 'status' => 'pending', 'priority' => 'Urgent'],
            ['id' => 4, 'title' => 'Setup Fastlane deployment script for Android', 'project' => 'Mobile App Fastlane', 'status' => 'in_progress', 'priority' => 'Low'],
        ];

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'projects' => $projects,
            'teams' => $teams,
            'recentTasks' => $recentTasks,
        ]);
    }
}