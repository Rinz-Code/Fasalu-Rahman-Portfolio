from django.contrib import admin
from api.models import Post,Comment,PostImage,Gallery

admin.site.register(Post)
# admin.site.register(Comment)
admin.site.register(PostImage)
admin.site.register(Gallery)

