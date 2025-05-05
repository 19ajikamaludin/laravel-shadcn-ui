<?php

namespace App\Constants;

use App\Models\Default\User;
use Illuminate\Support\Facades\Route;

class MenuConstant
{
    public static function all()
    {
        $menu = [
            [
                'title' => 'Dashboard',
                'icon' => 'LayoutGrid',
                'route' => route('dashboard'),
                'active' => request()->routeIs('dashboard'),
                'permission' => 'view-dashboard',
            ],

            [
                'title' => 'Setting',
                'icon' => 'Settings2',
                'items' => [
                    [
                        'title' => 'General',
                        'route' => route('setting.index'),
                        'active' => request()->routeIs('setting.*'),
                        'permission' => 'view-setting',
                    ],
                    [
                        'title' => 'Roles',
                        'route' => route('roles.index'),
                        'active' => request()->routeIs('roles.*'),
                        'permission' => 'view-role',
                    ],
                    [
                        'title' => 'Users',
                        'route' => route('users.index'),
                        'active' => request()->routeIs('users.*'),
                        'permission' => 'view-user',
                    ],

                ],
            ],


            // # Add Generated Menu Here!
        ];

        return $menu;
    }

    public static function handle()
    {
        return self::all();
    }
}
