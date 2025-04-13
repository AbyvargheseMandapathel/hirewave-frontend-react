# Generated by Django 5.2 on 2025-04-13 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_alter_job_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='type',
            field=models.CharField(choices=[('full-time', 'Full Time'), ('part-time', 'Part Time'), ('contract', 'Contract'), ('internship', 'Internship'), ('remote', 'Remote')], max_length=20),
        ),
    ]
