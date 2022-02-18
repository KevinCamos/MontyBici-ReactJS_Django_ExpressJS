release: python ./Backend/manage.py makemigrations --no-input
release: python ./Backend/manage.py migrate --no-input
release: python ./Backend/manage.py runserver

web: gunicorn montybici.wsgi
