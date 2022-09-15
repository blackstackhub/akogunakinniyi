from django.conf import settings
from django.urls import path, include, re_path
from django.conf.urls.static import static
from home import views

urlpatterns = [
    path('', include('home.urls')),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

