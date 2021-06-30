# Generated by Django 3.1.7 on 2021-04-30 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_postimage_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('camp_name', models.CharField(max_length=100)),
                ('conducted_by', models.CharField(max_length=100)),
                ('image_1', models.ImageField(upload_to='')),
                ('image_2', models.ImageField(blank=True, null=True, upload_to='')),
                ('image_3', models.ImageField(blank=True, null=True, upload_to='')),
                ('image_4', models.ImageField(blank=True, null=True, upload_to='')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]