dev-backend:
	cd leadmanager/frontend && npm run build
	cd leadmanager && python manage.py runserver 8888