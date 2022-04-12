from asyncio.log import logger
import time
from .serializers import EmailSerializer
from src import settings

# https://github.com/dabapps/django-db-queue
def notification_mail(job):
    data = job.workspace['data']
    print("Se está enviando un mensaje")
    subject = "MontyBicis, incidencia " + "'"+data['reason']+"'"
    message = "Buenos dias "+data['name'] + \
        ",\n\nGracias por contactar con MontyBici, hemos leído tu solicitud, la tendremos en consideración, si es necesario nos pondremos en contacto con usted." + \
        "\n\nTipo de incidencia: " + "'"+data['reason']+"'" + \
        "\nTu mensaje: " + "'"+data['usermessage']+"'"+ \
        "\n\nGracias por tu tiempo"+\
        "\n\nMontyBici"

    serializer_class = EmailSerializer
    # Ponemos settings.DEFAULT_FROM_EMAIL, ya que es el unico correo que puede recibir correos, aquí deberímamos poner data['email']
    serializer_data = {"subject": subject, "message": message,
                       "receiver": settings.DEFAULT_FROM_EMAIL}
    serializer = serializer_class(
        data=serializer_data
    )

    serializer.is_valid(raise_exception=True)
    serializer.sendmail()


def notification_mail_fail(job, e):
    print("Ha habido un error enviando el mensaje")
    print(job)


