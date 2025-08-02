# Laravel Shadcn UI

just another laravel starter-kit with inertiajs, reactjs, laravel, shadcn UI and just JSX, with my additional ui ready to use component and setuped RBAC

## Support me

<a href="https://trakteer.id/ajikamaludin" target="_blank"><img id="wse-buttons-preview" src="https://cdn.trakteer.id/images/embed/trbtn-blue-2.png" height="40" style="border:0px;height:40px;" alt="Trakteer Saya"></a>

## Requirements

- PHP 8.3 or latest
- Node 20+ or latest

## How to run

prepare env

```bash
cp .env.example .env # configure app for laravel
touch database/database.sqlite # if you use .env.example with default sqlite database
composer install
npm install
```

use php server

```bash
php artisan migrate --seed # create table for db and seed data
php artisan key:gen
php artisan ziggy:generate # generate route file for frontend
php artisan ser #keep run to dev
```

compile asset

```bash
npm run dev # compiling asset for development # keep run for dev
```

<hr/>

easy way

```bash
docker compose up -d
```

## Default User

```bash
username : admin@admin.com
password : password
```

## Deploy ( go to production )

1. setup env .env APP_URL with valid url prod, APP_ENV to production

### method 1 - compile assets

```bash
php artisan ziggy:generate

npm run build
```

after build the assets you can manually compress you application to deploy on web hosting / vps

### method 2 - compress asset to ready upload

```bash
php artisan ziggy:generate

php artisan build
```

this command will generate `app_name.zip` in your root folder and its file ready with build assets and optimize files

## The UI

![](screenshot_v3.png?raw=true)

<hr/>

## Features

### 1. Scaffold generator

it can generate 3 type of crud : form modal, form page, and single form, run command below to test

```bash
php artisan scaffold
```

<!-- ![](screenshot_generator.gif?raw=true) -->

### Shadcn UI components

```
npx shadcn@latest add accordion breadcrumb chart dialog label scroll-area sidebar textarea alert button checkbox dropdown-menu navigation-menu select skeleton toggle-group avatar calendar collapsible form pagination separator table toggle badge card context-menu input popover sheet tabs tooltip
```
