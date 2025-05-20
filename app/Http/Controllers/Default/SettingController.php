<?php

namespace App\Http\Controllers\Default;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Default\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    #[Permission('view-setting')]
    public function index()
    {
        return inertia('settings/index', [
            'settings' => Setting::all(),
        ]);
    }

    #[Permission('update-setting')]
    public function update(Request $request)
    {
        $request->validate([
            'app_name' => 'required|string',
            'app_logo' => 'nullable|string',
        ]);

        DB::beginTransaction();

        foreach ($request->except(['app_logo']) as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? '', 'type' => 'text'],
            );
        }

        foreach ($request->only(['app_logo']) as $key => $value) {
            if ($value != '') {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value ?? ''],
                );
            }
        }

        DB::commit();

        return redirect()->route('setting.index')
            ->with('message', ['type' => 'success', 'message' => 'Setting created']);
    }
}
