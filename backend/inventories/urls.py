from django.urls import path
from .views import InventoryReportListCreateView, InventoryReportDetailsView, InventoryReportRemoveView
from .views import InventorySupplyView, InventoryReportCSV, InventoryReportLastUpdateView

app_name = "inventories"

urlpatterns = [
    path('', InventoryReportListCreateView.as_view()),
    path('<int:pk>', InventoryReportDetailsView.as_view(), name='report-details'),
    path('<int:inventory_id>/supplies/<int:inventory_supply_id>',
         InventorySupplyView.as_view(), name='supplies-details-update'),
    path('remove/<int:pk>', InventoryReportRemoveView.as_view(), name='report-remove'),
    path('<int:pk>/last_update',
         InventoryReportLastUpdateView.as_view(), name="last-update"),
    path('csv/<int:pk>', InventoryReportCSV.as_view(), name='report-csv'),
]
