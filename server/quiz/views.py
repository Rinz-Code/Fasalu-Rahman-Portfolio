from rest_framework import generics
from rest_framework.response import Response
from .models import Quizzes, Question,Score
from .serializers import QuizSerializer, RandomQuestionSerializer, QuestionSerializer, ScoreSerializer, QuizCreateSerializer, QuestionCreateSerializer
from rest_framework.views import APIView
from api.permissions import IsAdminUserOrReadOnly
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response


class QuizScore(generics.ListCreateAPIView):
    queryset = Score.objects.all()
   
    serializer_class = ScoreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        file_serializer = ScoreSerializer(data=request.data)
        if file_serializer.is_valid():
                file_serializer.save(user=self.request.user)
                return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
                return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class Quiz(generics.ListAPIView):

    serializer_class = QuizSerializer
    queryset = Quizzes.objects.all()

class RandomQuestion(APIView):

    def get(self, request, format=None, **kwargs):
        question = Question.objects.filter(quiz__title=kwargs['topic']).order_by('?')[:1]
        serializer = RandomQuestionSerializer(question, many=True)
        return Response(serializer.data)

class QuizQuestion(APIView):

    def get(self, request, format=None, **kwargs):
        quiz = Question.objects.filter(quiz__title=kwargs['topic'])
        serializer = QuestionSerializer(quiz, many=True)
        return Response(serializer.data)

class QuizCreate(generics.ListCreateAPIView):
    queryset = Quizzes.objects.all()
    serializer_class = QuizCreateSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsAdminUserOrReadOnly]

class QuestionCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionCreateSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsAdminUserOrReadOnly]


