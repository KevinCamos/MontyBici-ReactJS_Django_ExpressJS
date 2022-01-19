from django.apps import AppConfig


class StationAppConfig(AppConfig):
    name = 'conduit.apps.stations'
    label = 'stations'
    verbose_name = 'Stations'

    def ready(self):
        import conduit.apps.stations.signals

default_app_config = 'conduit.apps.stations.StationAppConfig'