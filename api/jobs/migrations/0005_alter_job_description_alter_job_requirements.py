# Generated by Django 5.2 on 2025-04-13 15:41

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0004_savedjob'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='description',
            field=ckeditor.fields.RichTextField(),
        ),
        migrations.AlterField(
            model_name='job',
            name='requirements',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
