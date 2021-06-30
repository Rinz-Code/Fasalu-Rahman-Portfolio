from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Post,Comment,PostImage,Gallery
# from .serializers import PostSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

# class CategorySerializer(serializers.ModelSerializer):
#     owner = serializers.ReadOnlyField(source='owner.username')
#     posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

#     class Meta:
#         model = Category
#         fields = ['id', 'name', 'owner', 'posts']

class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    comments = serializers.PrimaryKeyRelatedField(many=True,queryset=Comment.objects.all())
    # categories = CategorySerializer(many=True)
    class Meta:
        model = Post
        fields = ['id', 'title','slug', 'body','owner','notify_users' ,'comments','image']
    # def create(self, validated_data):
    #     categories = validated_data.pop('categoires')
    #     console.log(categories)
    #     post = post.objects.create(**validated_data)
    #     for category in categories:
    #         blogs.tags.add(category)
    #     return blogs


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comment
        fields = ['id', 'body', 'owner', 'post']


class UserSerializer(serializers.ModelSerializer):
    # posts = PostSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    # categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username',  'comments', 'is_staff']#, 'categories']

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password',)
        extra_kwargs = {'password': {'write_only': True}}
        # permi

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user



# class PostImageSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField()
#     class Meta():
#         model = PostImage
#         fields = ('image', 'post','owner')


class ImageSerializer(serializers.ModelSerializer):
      class Meta:
        model= PostImage
        fields= ('uploaded_at','image','name')
    #   def create(self, validated_data):
        # image=validated_data.pop('image')
        # uploaded_at=validated_data.pop('uploaded_at')
        # return PostImage.objects.create(uploaded_at=uploaded_at,image=image)

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'