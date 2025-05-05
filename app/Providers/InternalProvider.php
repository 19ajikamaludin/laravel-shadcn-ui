<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

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
                    \Internal\Commands\BuildArchiveCommand::class,
                    \Internal\Commands\PermissionCommand::class,
                    \Internal\Commands\ScaffoldCommand::class,
                    \Internal\Commands\SettingCommand::class
                ]
            );
        }
    }
}
