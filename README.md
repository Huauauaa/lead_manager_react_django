# react_django

## prepare

`pipenv3 shell`
`pipenv3 install django djangorestframework django-rest-knox`

## create project and app

`django-admin startproject leadmanager`
`python leadmanager/manage.py startapp leads`

## run

`python leadmanager/manage.py runserver`

## FrontEnd

### cd root

`cd leadmanager`

### init frontend

`yarn create vite frontend --template react`

## config vite.config.js

```js
import { defineConfig } from 'vite';
export default defineConfig({
  build: { outDir: '../static/dist' },
  base: '/static/dist/',
});
```

### start index app

`python manage.py startapp index`

### update settings.py

```python
INSTALLED_APPS = [
    'index',
]
TEMPLATES = [
  {
    'DIRS': [os.path.join(BASE_DIR, 'static/dist')],
  },
]

STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
```

### add url and view

urls.py

```python
urlpatterns = [
    path('', include('index.urls')),
]
```

index/urls.py

```python
from django.urls import path
from .views import index
urlpatterns = [path('', index)]
```

index/views.py

```python
from django.shortcuts import render
def index(request):
    return render(request, 'index.html')
```

### build and run

`yarn build`
`python manage.py runserver`
