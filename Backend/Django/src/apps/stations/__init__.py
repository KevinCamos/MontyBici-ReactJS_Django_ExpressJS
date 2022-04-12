from django.apps import AppConfig


class StationAppConfig(AppConfig):
    name = 'src.apps.stations'
    label = 'stations'
    verbose_name = 'Stations'

    def ready(self):
        import src.apps.stations.signals

default_app_config = 'src.apps.stations.StationAppConfig'