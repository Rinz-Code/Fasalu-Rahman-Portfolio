from django.urls import path
from .views import Quiz, RandomQuestion, QuizQuestion, QuizScore, QuizCreate, QuestionCreate

app_name='quiz'

urlpatterns = [
    path('', Quiz.as_view(), name='quiz'),
    path('r/<str:topic>/', RandomQuestion.as_view(), name='random' ),
    path('q/<str:topic>/', QuizQuestion.as_view(), name='questions' ),
    path('do/', QuizCreate.as_view(), name='Createquestions' ),
    path('newQuestion/', QuestionCreate.as_view(), name='Createquestions' ),
    path('score/', QuizScore.as_view(), name='score' ),
]
