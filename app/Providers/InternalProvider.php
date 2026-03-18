<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Internal\Commands\BuildArchiveCommand;
use Internal\Commands\PermissionCommand;
use Internal\Commands\ScaffoldCommand;
use Internal\Commands\SettingCommand;

class InternalProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (file_exists(base_path('internal/Commands'))) {
            $this->commands(
                [
                    BuildArchiveCommand::class,
                    PermissionCommand::class,
                    ScaffoldCommand::class,
                    SettingCommand::class,
                ]
            );
        }
    }
}
