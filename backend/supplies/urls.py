from django.urls import path

from .views import SupplyListView, SupplyDetailsView, SearchSupplyView

urlpatterns = [
    path('', SupplyListView.as_view()),
    path('<int:pk>/', SupplyDetailsView.as_view()),
    path('search', SearchSupplyView.as_view()),
]
