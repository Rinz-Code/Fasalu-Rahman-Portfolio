from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/new/', views.UserCreate.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('posts/', views.PostList.as_view()),
    path('posts/<str:slug>/', views.PostDetail.as_view()),
    path('gallery/', views.GalleryList.as_view()),
    # path('comments/<int:pk>/', views.CommentDetail.as_view()),
    path('images/post/',views.Images.as_view())
    # path('categories/', views.CategoryList.as_view()),
    # path('categories/<int:pk>/', views.CategoryDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)