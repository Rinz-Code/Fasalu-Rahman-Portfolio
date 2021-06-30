from django.conf import settings
from django.db import models
from django.utils.text import slugify
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import pre_save, post_save
from django.core.mail import send_mail
from io import BytesIO
from PIL import Image
from django.core.files import File


def compress(image):
    im = Image.open(image).convert('RGB')
    # create a BytesIO object
    im_io = BytesIO() 
    # save image to BytesIO object
    im.save(im_io, 'JPEG', quality=70) 
    # create a django-friendly Files object
    new_image = File(im_io, name=image.name)
    return new_image

import string 
# from django.utils.text import slugify 
import random 
  
def random_string_generator(size = 10, chars = string.ascii_lowercase + string.digits): 
    return ''.join(random.choice(chars) for _ in range(size)) 
  
def unique_slug_generator(instance, new_slug = None): 
    if new_slug is not None: 
        slug = new_slug 
    else: 
        slug = slugify(instance.title) 
    Klass = instance.__class__ 
    qs_exists = Klass.objects.filter(slug = slug).exists() 
    if qs_exists: 
        new_slug = "{slug}-{randstr}".format( 
            slug = slug, randstr = random_string_generator(size = 4)) 
        print(new_slug)
              
        return unique_slug_generator(instance, new_slug = new_slug) 
    return slug 

class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    body = models.TextField(blank=True, default='')
    slug = models.SlugField(null=True, blank=True)
    image = models.ImageField(blank=True, null=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    notify_users = models.BooleanField(default=True)
    notify_users_timestamp = models.DateTimeField(
        blank=True, null=True, auto_now_add=False)
    owner = models.ForeignKey(
        'auth.User', related_name='posts', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['created']


@receiver(pre_save, sender=Post)
def post_pre_save(sender, instance, *args, **kwargs):
    if not instance.slug: 
       instance.slug = unique_slug_generator(instance)
    if instance.notify_users:
        print("notify users ,Send Mail")
        subject = f'Alert: {instance.title}'
        body = instance.body[slice(50)]
        message = f'Hi User,\nHere is The shorten Content of the Alert Blog:\n{body}.....\n\n Checkout This Blog:http://localhost:3000/posts/{instance.slug} \n\nBy Fasal Cheekode Creative Corner'
        send_mail(
            subject,
            message,
            'rinzcodemail@gmail.com',
            ['rerinu132@gmail.com'],
            fail_silently=False,
        )
        print('finish')
        instance.notify_users = False
        instance.notify_users_timestamp = timezone.now()
        # instance.save()


# @receiver(post_save, sender=Post)
# def post_post_save(sender, instance, created, *args, **kwargs):
#     # instance.save()



class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField(blank=False)
    owner = models.ForeignKey(
        'auth.User', related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, related_name='comments', on_delete=models.CASCADE)

    def __str__(self):
        return self.body

    class Meta:
        ordering = ['created']

# class Category(models.Model):
#     name = models.CharField(max_length=100, blank=False, default='')
#     owner = models.ForeignKey('auth.User', related_name='categories', on_delete=models.CASCADE)
#     # posts = models.ManyToManyField(Post, related_name='categories', blank=True)
#     def __str__(self):
#     	return self.name
#     class Meta:
#         verbose_name_plural = 'categories'

class PostImage(models.Model):
    # post = models.ForeignKey(Post,related_name='image',on_delete=models.CASCADE,null=True,blank=True)
    image = models.ImageField(blank=False,null=False)
    name = models.CharField(max_length=123,null=True,blank=True)
    # owner = models.ForeignKey(User,related_name='image',on_delete=models.CASCADE,null=True,blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.uploaded_at
    def save(self,*args,**kwargs):
        newimage = compress(self.image)
        self.image = newimage

class Gallery(models.Model):
    camp_name = models.CharField(max_length=100)
    conducted_by = models.CharField(max_length=100)
    image_1 = models.ImageField(blank=False,null=False)
    image_2 = models.ImageField(blank=True,null=True)
    image_3 = models.ImageField(blank=True,null=True)
    image_4 = models.ImageField(blank=True,null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.camp_name} conducted by {self.conducted_by}'
    def save(self, *args, **kwargs):
        # call the compress function
        new_image_1 = compress(self.image_1)
        # set self.image to new_image
        self.image_1 = new_image_1
        if self.image_2:
            new_image_2 = compress(self.image_2)
            self.image_2 = new_image_2
        if self.image_3:
            new_image_3 = compress(self.image_3)
            self.image_3 = new_image_3
        if self.image_2:
            new_image_4 = compress(self.image_4)
            self.image_4 = new_image_4
        # save
        super().save(*args, **kwargs)
