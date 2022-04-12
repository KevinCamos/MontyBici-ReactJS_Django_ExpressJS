from src.apps.core.renderers import srcJSONRenderer


# class StationJSONRenderer(srcJSONRenderer):
#     object_label = 'article'
#     pagination_object_label = 'articles'
#     pagination_count_label = 'articlesCount'


class PointJSONRenderer(srcJSONRenderer):
    object_label = 'point'
    pagination_object_label = 'points'
    pagination_count_label = 'pointsCount'
