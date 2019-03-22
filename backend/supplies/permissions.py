from rest_framework import permissions
from .models import Supply


class IsAuthenticatedReadOnly(permissions.IsAdminUser):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.method in permissions.SAFE_METHODS:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and request.method in permissions.SAFE_METHODS:
            return True
        return False