<?php

namespace App\Http\Middleware;

use App\Constants\MenuConstant;
use App\Models\Default\Setting;
use App\Services\UserJwtService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? $request->user()->load(['role.permissions']) : $request->user(),
                'login_at' => session()->get('user_login_at', ''),
                'jwt_token' => UserJwtService::getActiveToken(),
                'jwt_prefix' => UserJwtService::KEYPREFIX,
            ],
            'flash' => [
                'message' => fn() => session()->get('message'),
                'data' => fn() => session()->get('data'),
            ],
            'app' => Setting::getByKeys(['app_name', 'app_logo', 'ppn_percent']),
            'navigation' => MenuConstant::handle($request->user())
        ];
    }
}
