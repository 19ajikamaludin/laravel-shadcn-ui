<?php

namespace App\Constants;

class PermissionConstant
{
    const LIST = [
        ['label' => 'View Dashboard', 'name' => 'view-dashboard', 'group' => 'General'],

        ['label' => 'Create User', 'name' => 'create-user', 'group' => 'User'],
        ['label' => 'Update User', 'name' => 'update-user', 'group' => 'User'],
        ['label' => 'View User', 'name' => 'view-user', 'group' => 'User'],
        ['label' => 'Delete User', 'name' => 'delete-user', 'group' => 'User'],

        ['label' => 'Create Role', 'name' => 'create-role', 'group' => 'User'],
        ['label' => 'Update Role', 'name' => 'update-role', 'group' => 'User'],
        ['label' => 'View Role', 'name' => 'view-role', 'group' => 'User'],
        ['label' => 'Delete Role', 'name' => 'delete-role', 'group' => 'User'],

        ['label' => 'View Setting', 'name' => 'view-setting', 'group' => 'General'],
        ['label' => 'Update Setting', 'name' => 'update-setting', 'group' => 'General'],
        // #Add New Permission Below!

    ];

    public static function all()
    {
        return array_merge(self::LIST);
    }
}
