from rest_framework import permissions


# class IsStaff(permissions.BasePermission):

#     def has_permission(self, request, view, obj=None):

#         try:
#             return  request.user.is_staff
#         except:
#             return 'You shall not pass!'


class IsStaff(permissions.BasePermission):
    message = 'You shall not pass'

    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class IsNotStaff(permissions.BasePermission):
    message = 'Only for users'

    def has_permission(self, request, view):
        return request.user and (request.user.is_staff == False)
