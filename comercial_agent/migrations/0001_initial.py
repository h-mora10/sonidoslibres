# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-10-02 01:46
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_picture', models.ImageField(max_length=1000, upload_to='profilePictures')),
                ('artistic_name', models.CharField(max_length=255)),
                ('account_number', models.IntegerField()),
                ('address', models.CharField(max_length=150)),
                ('city', models.CharField(max_length=30)),
                ('country', models.CharField(max_length=30)),
                ('telephone', models.IntegerField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Artwork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('ratingCount', models.IntegerField()),
                ('likesCount', models.IntegerField()),
                ('dislikesCount', models.IntegerField()),
                ('playsCount', models.IntegerField()),
                ('averageRating', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ArtworkCollection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artist', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='comercial_agent.Artist')),
            ],
        ),
        migrations.CreateModel(
            name='ArtworkRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('features', models.CharField(max_length=1020)),
            ],
        ),
        migrations.CreateModel(
            name='BusinessAgent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_picture', models.ImageField(max_length=1000, upload_to='profilePictures')),
                ('company_name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=150)),
                ('city', models.CharField(max_length=30)),
                ('country', models.CharField(max_length=30)),
                ('telephone', models.IntegerField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_picture', models.ImageField(max_length=1000, upload_to='profilePictures')),
                ('telephone', models.IntegerField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('initial_date', models.DateField()),
                ('closing_date', models.DateField()),
                ('description', models.CharField(max_length=510)),
                ('notification_type', models.CharField(choices=[('PR', 'Privada'), ('PB', 'Publica')], default='PB', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='SoundType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Sound',
            fields=[
                ('artwork_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='comercial_agent.Artwork')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='comercial_agent.SoundType')),
            ],
            bases=('comercial_agent.artwork',),
        ),
        migrations.AddField(
            model_name='tag',
            name='artwork',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='comercial_agent.Artwork'),
        ),
        migrations.AddField(
            model_name='artworkrequest',
            name='notification',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='comercial_agent.Notification'),
        ),
        migrations.AddField(
            model_name='artwork',
            name='collection',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='comercial_agent.ArtworkCollection'),
        ),
    ]
