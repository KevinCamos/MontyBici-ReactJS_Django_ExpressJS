from src.apps.core.renderers import srcJSONRenderer


class ProfileJSONRenderer(srcJSONRenderer):
    object_label = 'profile'
    pagination_object_label = 'profiles'
    pagination_count_label = 'profilesCount'
