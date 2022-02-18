release: python ./Backend/manage.py makemigrations --no-input
release: python ./Backend/manage.py migrate --no-input

web: gunicorn montybici.wsgi