<?php

namespace Database\Seeders;

use App\Constants\PermissionConstant;
use App\Constants\SettingConstant;
use App\Models\Default\Permission;
use App\Models\Default\Role;
use App\Models\Default\Setting;
use App\Models\Default\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (SettingConstant::all() as $setting) {
            Setting::insert(['id' => str()->ulid(), ...$setting]);
        }

        foreach (PermissionConstant::all() as $permission) {
            Permission::insert(['id' => str()->ulid(), ...$permission]);
        }

        $role = Role::create(['name' => 'Administator']);

        $permissions = Permission::all();
        foreach ($permissions as $permission) {
            $role->rolePermissions()->create(['permission_id' => $permission->id]);
        }

        User::create([
            'name' => 'Administator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'role_id' => $role->id,
        ]);
    }
}
