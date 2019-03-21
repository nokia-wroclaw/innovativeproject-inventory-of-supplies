from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

class NameRegisterSerializer(RegisterSerializer):
	"""
	Custom signup that takes first and last names as optional argument
	"""
	first_name = serializers.CharField(required=False)
	last_name = serializers.CharField(required=False)

	def custom_signup(self, request, user):
		user.first_name = self.validated_data.get('first_name', '')
		user.last_name = self.validated_data.get('last_name', '')
		user.save(update_fields=['first_name', 'last_name'])