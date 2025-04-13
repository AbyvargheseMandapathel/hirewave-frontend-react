# Generated by Django 5.2 on 2025-04-13 09:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('company', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('salary', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('full-time', 'Full Time'), ('part-time', 'Part Time'), ('contract', 'Contract'), ('internship', 'Internship'), ('remote', 'Remote')], max_length=20)),
                ('description', models.TextField()),
                ('requirements', models.TextField()),
                ('status', models.CharField(choices=[('active', 'Active'), ('paused', 'Paused'), ('closed', 'Closed'), ('draft', 'Draft')], default='active', max_length=20)),
                ('external_link', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('posted_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
