release: python ./Backend/manage.py makemigrations --no-input
release: python ./Backend/manage.py migrate --no-input
web: gunicorn --chdir Backend src.wsgi --log-file -
# release: python ./Backend/manage.py runserver
